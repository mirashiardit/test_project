import { AppService } from "../core/services/app.service";
import { Request, Response } from "express";
import urlValidator from "../helpers/url-validator.helper";

export class AppController {
  constructor(private appService: AppService) {}

  async createApp(req: Request, res: Response): Promise<void> {
    const { url } = req.body;

    const isValidUrl = urlValidator.isGooglePlayStoreAppUrl(url);

    if (!isValidUrl) {
      res.status(400).json({ error: "Not a valid application url" });
      return;
    }

    const name = urlValidator.extractAppNameFromUrl(url);

    try {
      const app = await this.appService.createApp(name, url);
      res.status(201).json(app);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Failed to create app" });
    }
  }

  async getAppById(req: Request, res: Response): Promise<void> {
    const { appId } = req.params;
    try {
      const app = await this.appService.getAppById(appId);
      if (app) {
        res.json(app);
      } else {
        res.status(404).json({ error: "App not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve app" });
    }
  }

  async getAllApps(req: Request, res: Response): Promise<void> {
    try {
      const apps = await this.appService.getAllApps();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve apps" });
    }
  }

  async updateApp(req: Request, res: Response): Promise<void> {
    const { appId } = req.params;
    const { name, url } = req.body;
    try {
      const existingApp = await this.appService.getAppById(appId);
      if (existingApp) {
        existingApp.name = name;
        existingApp.url = url;
        await this.appService.updateApp(existingApp);
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: "App not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update app" });
    }
  }

  async deleteApp(req: Request, res: Response): Promise<void> {
    const { appId } = req.params;
    try {
      await this.appService.deleteApp(appId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete app" });
    }
  }

  async getAppScreenshots(req: Request, res: Response): Promise<void> {
    const { appId } = req.params;
    try {
      const screenshots = await this.appService.findScreenshotsByAppId(appId);
      res.json(screenshots);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve screenshots" });
    }
  }
}
