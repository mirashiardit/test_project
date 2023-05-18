import { container } from "tsyringe";
import { AppRepository } from "./core/repositories/app.repository";
import { ScreenshotRepository } from "./core/repositories/screenshot.repository";
import { AppService } from "./core/services/app.service";
import { BrowserService } from "./core/services/browser.service";
import { ScheduleService } from "./core/services/schedule.service";
import { StorageService } from "./core/services/storage.service";
import { AppController } from "./controllers/app.controller";

container.register<AppRepository>("AppRepository", {
  useValue: new AppRepository(),
});
container.register<ScreenshotRepository>("ScreenshotRepository", {
  useValue: new ScreenshotRepository(),
});

container.register<BrowserService>("BrowserService", {
  useValue: new BrowserService(),
});
container.register<StorageService>("StorageService", {
  useValue: new StorageService(),
});
container.register<ScheduleService>("ScheduleService", {
  useValue: new ScheduleService(
    container.resolve("ScreenshotRepository"),
    container.resolve("BrowserService"),
    container.resolve("StorageService")
  ),
});
container.register<AppService>("AppService", {
  useValue: new AppService(
    container.resolve("AppRepository"),
    container.resolve("ScreenshotRepository"),
    container.resolve("ScheduleService")
  ),
});

container.register<AppController>("AppController", {
  useValue: new AppController(container.resolve("AppService")),
});


export default container;