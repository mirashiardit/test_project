import { App } from "../entities/app.entity";
import { Screenshot } from "../entities/screenshot.entity";
import { IAppRepository } from "../../interfaces/repositories/app-repository.interface";


export class AppRepository implements IAppRepository {

  async findAll(): Promise<App[]> {
    const apps = await App.findAll({ raw: true });
    return apps;
  }

  async findById(id: string): Promise<App | null> {
    const app = await App.findByPk(id, { raw: true });
    if (!app) return null;
    const screenshots = await this.findScreenshotsByAppId(id);
    return app;
  }

  async save(app: App): Promise<void> {
    await App.create({id: app.id,
     url: app.url, name: app.name, startTime: app.startTime});
  }

  async delete(id: string): Promise<void> {
    await App.destroy({ where: { id } });
  }

  async findScreenshotsByAppId(appId: string): Promise<Screenshot[]> {
    const screenshots = await Screenshot.findAll({ where: { appId }, raw: true });
    return screenshots;
  }

  async saveScreenshot(screenshot: Screenshot): Promise<void> {
    await Screenshot.create({
        id: screenshot.id,
        appId: screenshot.appId,
        imageUrl: screenshot.imageUrl,
        timestamp: screenshot.timestamp
    });
  }
}
