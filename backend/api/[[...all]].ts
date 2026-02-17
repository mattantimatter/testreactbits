import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import serverless from 'serverless-http';
import { AppModule } from '../src/app.module';

let cachedHandler:
    | ((
        req: Parameters<ReturnType<typeof serverless>>[0],
        res: Parameters<ReturnType<typeof serverless>>[1],
    ) => Promise<unknown>)
    | null = null;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: configService.get('CORS_ORIGIN') || '*',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.setGlobalPrefix('api');
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverless(expressApp);
}

export default async function handler(req: any, res: any) {
    if (!cachedHandler) {
        cachedHandler = (await bootstrap()) as typeof cachedHandler;
    }

    return cachedHandler(req, res);
}
