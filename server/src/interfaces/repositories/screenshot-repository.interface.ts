import { Screenshot } from "core/entities/screenshot.entity";

export interface IScreenshotRepository {
  findScreenshotsByAppId(appId: string): Promise<Screenshot[]>;
  findScreenshotCountByAppId(appId: string): Promise<number>;
  saveScreenshot(screenshot: Screenshot): Promise<void>;
}
