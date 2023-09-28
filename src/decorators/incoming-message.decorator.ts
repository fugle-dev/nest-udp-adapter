import { SubscribeMessage } from '@nestjs/websockets';

export function IncomingMessage(): MethodDecorator {
  return SubscribeMessage('message');
}
