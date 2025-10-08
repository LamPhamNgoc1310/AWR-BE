import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: false,
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
  console.log(`BE running on port: ${process.env.PORT || 4000}`);
}
bootstrap();
