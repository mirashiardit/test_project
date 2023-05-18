import { Screenshot } from "../entities/screenshot.entity";
import { IScreenshotRepository } from "../../interfaces/repositories/screenshot-repository.interface";

export class ScreenshotRepository implements IScreenshotRepository {
  async findScreenshotsByAppId(appId: string): Promise<Screenshot[]> {
    const screenshots = await Screenshot.findAll({
      where: { appId },
      raw: true,
    });
    return screenshots;
  }

  async findScreenshotCountByAppId(appId: string): Promise<number> {
    const screenshotCount = await Screenshot.count({
      where: { appId },
    });

    return screenshotCount;
  }

  async saveScreenshot(screenshot: Screenshot): Promise<void> {
    await Screenshot.create({
      id: screenshot.id,
      appId: screenshot.appId,
      imageUrl: screenshot.imageUrl,
      timestamp: screenshot.timestamp,
    });
  }
}
