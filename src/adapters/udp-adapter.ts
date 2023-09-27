import { createSocket, Socket, SocketType, SocketOptions, BindOptions } from 'dgram';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { MessageMappingProperties } from '@nestjs/websockets';
import { fromEvent, Observable } from 'rxjs';
import { filter, first, map, mergeMap, share, takeUntil } from 'rxjs/operators';
import { CLOSE_EVENT, LISTENING_EVENT } from '../constants';

export interface UdpAdapterOptions {
  type?: SocketType;
  port?: number;
  address?: string;
  socketOptions?: SocketOptions;
  bindOptions?: BindOptions;
  multicastAddress?: string;
  multicastInterface?: string;
}

export class UdpAdapter implements WebSocketAdapter {
  private readonly type: SocketType;
  private readonly port: number;
  private readonly address: string;
  private readonly multicastAddress: string;
  private readonly multicastInterface: string;
  private readonly socketOptions: SocketOptions;
  private readonly bindOptions: BindOptions;

  constructor(private app: INestApplicationContext, options: UdpAdapterOptions = {}) {
    this.type = options.type ?? 'udp4';
    this.port = options.port;
    this.address = options.address;
    this.socketOptions = options.socketOptions;
    this.bindOptions = options.bindOptions;
    this.multicastAddress = options.multicastAddress;
    this.multicastInterface = options.multicastInterface;
  }

  public create(port: number, options: any = {}) {
    const server = (this.socketOptions)
      ? createSocket(this.socketOptions)
      : createSocket(this.type);

    server.bind({ port: port || this.port, address: this.address, ...this.bindOptions }, () => {
      if (this.multicastAddress) {
        server.addMembership(this.multicastAddress, this.multicastInterface);
      }
    });

    return server;
  }

  public bindClientConnect(socket: Socket, callback: Function) {
    socket.on(LISTENING_EVENT, () => callback(socket));
  }

  public bindMessageHandlers(
    socket: Socket,
    handlers: MessageMappingProperties[],
    transform: (data: any) => Observable<any>,
  ) {
    const disconnect$ = fromEvent(socket, CLOSE_EVENT).pipe(
      share(),
      first(),
    );

    handlers.forEach(({ message, callback }) => {
      const source$ = fromEvent(socket, message).pipe(
        mergeMap((payload: any) => {
          const [msg, rinfo] = payload
          return transform(callback(msg, rinfo)).pipe(
            filter((response: any) => !isNil(response)),
            map((response: any) => [response, rinfo]),
          );
        }),
        takeUntil(disconnect$),
      );
      source$.subscribe(([response, rinfo]) => {
        return socket.send(response, rinfo.port, rinfo.address);
      });
    });
  }

  public close(socket: Socket) {
    socket.close();
  }
}
