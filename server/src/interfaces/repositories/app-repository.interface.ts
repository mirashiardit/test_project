import { Screenshot } from "core/entities/screenshot.entity";
import { App } from "../../core/entities/app.entity";

export interface IAppRepository {
  findAll(): Promise<App[]>;
  findById(id: string): Promise<App | null>;
  save(app: App): Promise<void>;
  delete(id: string): Promise<void>;
  findScreenshotsByAppId(appId: string): Promise<Screenshot[]>;
  saveScreenshot(screenshot: Screenshot): Promise<void>;
}