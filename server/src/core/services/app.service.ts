import cron from 'node-cron';
import fs from 'fs';
import path from 'path';

import { App } from "../entities/app.entity";
import { Screenshot } from "../entities/screenshot.entity";
import { AppRepository } from "../repositories/app.repository";
import { IAppService } from "../../interfaces/services/app-service.interface";
import { BrowserService } from "./browser.service";
import envConfig from "../../helpers/environment-config.helper";


export class AppService implements IAppService {
    constructor(private appRepository: AppRepository, private browserService: BrowserService) {
        this.browserService.initialize();
    }

    async createApp(name: string, url: string): Promise<App> {
        const app = new App({
            name,
            url,
            startTime: new Date()
        });
        await this.appRepository.save(app);

        this.scheduleScreenshotJob(app.id, app.url)
        return app;
      }
    
      async getAppById(appId: string): Promise<App | null> {
        return this.appRepository.findById(appId);
      }
    
      async getAllApps(): Promise<App[]> {
        return this.appRepository.findAll();
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
        return this.appRepository.findScreenshotsByAppId(appId);
      }
    
      async saveScreenshot(appId: string, imageUrl: string): Promise<void> {
        const screenshot = new Screenshot({
            appId,
            imageUrl,
            timestamp: new Date()
        });
        await this.appRepository.saveScreenshot(screenshot);
      }

      private scheduleScreenshotJob(appId: string, appUrl: string): void {
        const cronSchedule = envConfig.get('SCREENSHOT_JOB_SCHEDULE') || '* * * * *';
    
        const job = cron.schedule(cronSchedule, async () => {
          try {
            const screenshotImage = await this.browserService.takeScreenshot(appUrl);
    
            const savedImagePath = await this.saveScreenshotImage(appId,screenshotImage);
    
            await this.saveScreenshot(appId, savedImagePath);
    
          } catch (error) {
            console.error(`Error occurred while taking and saving a screenshot: ${error}`);
          }
        });
    
        job.start();
      }

      private async saveScreenshotImage(appId: string, imageData: Buffer): Promise<string> {

        // Method temporarily stores the images file in a local folder
        // Later on should store images in a remote storage service and return a proper url

        const folderPath = path.resolve('../storage/screenshots');

        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, {recursive: true});
        }
      
        const fileName = `${appId}_${Date.now()}.png`;
      
        const imagePath = path.join(folderPath, fileName);
      
        await fs.promises.writeFile(imagePath, imageData);
      
        return fileName;
      }
    }

    
    
    
    
    
    
