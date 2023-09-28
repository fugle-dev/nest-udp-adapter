import { NestFactory } from '@nestjs/core';
import { UdpAdapter } from 'nest-udp-adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new UdpAdapter(app, {
    type: 'udp4',
    port: 41234,
  }));
  await app.listen(3000);
}
bootstrap();
