import { App, ExtendedApp } from "core/entities/app.entity";
import { Screenshot } from "core/entities/screenshot.entity";

export interface IAppService {
    createApp(name: string, url: string): Promise<App>;
    getAppById(appId: string): Promise<App | null>;
    getAllApps(): Promise<ExtendedApp[]>;
    updateApp(app: App): Promise<void>;
    deleteApp(appId: string): Promise<void>;
    findScreenshotsByAppId(appId: string): Promise<Screenshot[]>;
}