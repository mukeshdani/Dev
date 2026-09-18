import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Backend is running successfully',
      appName: process.env.APP_NAME || 'NestJS Backend',
      status: 'ok',
      port: Number(process.env.PORT ?? 3001),
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
      apiTokenConfigured: Boolean(process.env.API_TOKEN),
      databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
    };
  }
}
