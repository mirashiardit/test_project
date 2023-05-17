import { App } from "core/entities/app.entity";
import { Screenshot } from "core/entities/screenshot.entity";

export interface IAppService {
    createApp(name: string, url: string): Promise<App>;
    getAppById(appId: string): Promise<App | null>;
    getAllApps(): Promise<App[]>;
    updateApp(app: App): Promise<void>;
    deleteApp(appId: string): Promise<void>;
    findScreenshotsByAppId(appId: string): Promise<Screenshot[]>;
    saveScreenshot(appId: string, imageUrl: string): Promise<void>;
}