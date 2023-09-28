import { IncomingMessage, UdpGateway } from 'nest-udp-adapter';
import { Socket } from 'dgram';

@UdpGateway()
export class EventsGateway {
  @IncomingMessage()
  handleMessage(socket: Socket, data: any) {
    return 'Hello world!';
  }
}
