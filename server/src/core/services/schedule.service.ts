import cron from "node-cron";

import envConfig from "../../helpers/environment-config.helper";
import { IScheduleService } from "../../interfaces/services/schedule-service.interface";
import { BrowserService } from "./browser.service";
import { StorageService } from "./storage.service";
import { Screenshot } from "../entities/screenshot.entity";
import { ScreenshotRepository } from "../repositories/screenshot.repository";

export class ScheduleService implements IScheduleService {
  constructor(
    private screenshotRepository: ScreenshotRepository,
    private browserService: BrowserService,
    private storageService: StorageService
  ) {
    this.browserService.initialize();
  }

  scheduleScreenshotJob(appId: string, appUrl: string): void {
    const cronSchedule =
      envConfig.get("SCREENSHOT_JOB_SCHEDULE") || "* * * * *";

    const job = cron.schedule(cronSchedule, async () => {
      try {
        const screenshotImage = await this.browserService.takeScreenshot(
          appUrl
        );

        const savedImagePath = await this.storageService.saveScreenshotImage(
          appId,
          screenshotImage
        );

        const screenshot = new Screenshot({
          appId,
          imageUrl: savedImagePath,
          timestamp: new Date(),
        });
        await this.screenshotRepository.saveScreenshot(screenshot);
      } catch (error) {
        console.error(
          `Error occurred while taking and saving a screenshot: ${error}`
        );
      }
    });

    job.start();
  }
}
