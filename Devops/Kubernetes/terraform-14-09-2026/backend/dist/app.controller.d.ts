import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
        appName: string;
        status: string;
        port: number;
        frontendUrl: string;
        apiTokenConfigured: boolean;
        databaseUrlConfigured: boolean;
    };
}
