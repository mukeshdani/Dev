import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = Number(process.env.PORT ?? 3001);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
    app.enableCors({
        origin: frontendUrl,
        credentials: true,
    });
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
await bootstrap();
//# sourceMappingURL=main.js.map