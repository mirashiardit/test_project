import { App } from "../entities/app.entity";
import { IAppRepository } from "../../interfaces/repositories/app-repository.interface";

export class AppRepository implements IAppRepository {
  constructor() {}

  async findAll(): Promise<App[]> {
    const apps = await App.findAll({ raw: true });
    return apps;
  }

  async findById(id: string): Promise<App | null> {
    const app = await App.findByPk(id, { raw: true });
    if (!app) return null;
    return app;
  }

  async save(app: App): Promise<void> {
    await App.create({
      id: app.id,
      url: app.url,
      name: app.name,
      startTime: app.startTime,
    });
  }

  async delete(id: string): Promise<void> {
    await App.destroy({ where: { id } });
  }
}
