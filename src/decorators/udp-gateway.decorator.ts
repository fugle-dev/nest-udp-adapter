import { WebSocketGateway } from '@nestjs/websockets';

export function UdpGateway(): ClassDecorator {
  return WebSocketGateway();
}
