var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let AppService = class AppService {
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
};
AppService = __decorate([
    Injectable()
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map