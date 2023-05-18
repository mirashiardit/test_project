import { App, ExtendedApp } from "../entities/app.entity";
import { Screenshot } from "../entities/screenshot.entity";
import { AppRepository } from "../repositories/app.repository";
import { IAppService } from "../../interfaces/services/app-service.interface";
import { ScreenshotRepository } from "core/repositories/screenshot.repository";
import { ScheduleService } from "./schedule.service";

export class AppService implements IAppService {
  constructor(
    private appRepository: AppRepository,
    private screenshotRepository: ScreenshotRepository,
    private scheduleService: ScheduleService
  ) {
  }

  async createApp(name: string, url: string): Promise<App> {
    const app = new App({
      name,
      url,
      startTime: new Date(),
    });
    await this.appRepository.save(app);

    this.scheduleService.scheduleScreenshotJob(app.id, app.url);
    return app;
  }

  async getAppById(appId: string): Promise<App | null> {
    return this.appRepository.findById(appId);
  }

  async getAllApps(): Promise<ExtendedApp[]> {
    const apps: Array<App> = await this.appRepository.findAll();

    // It can be improved by implementing a promise pool with a limit of how many promises can resolve at a time

    return Promise.all(
      apps.map(async (app: App) => ({
        ...app,
        screenshotCount:
          await this.screenshotRepository.findScreenshotCountByAppId(app.id),
      }))
    );
  }

  async updateApp(app: App): Promise<void> {
    await this.appRepository.save(app);
  }

  async deleteApp(appId: string): Promise<void> {
    const app = await this.appRepository.findById(appId);
    if (app) {
      await this.appRepository.delete(appId);
    }
  }

  async findScreenshotsByAppId(appId: string): Promise<Screenshot[]> {
    return this.screenshotRepository.findScreenshotsByAppId(appId);
  }
}
