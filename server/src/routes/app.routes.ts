import { AppController } from "controllers/app.controller";
import { Router } from "express";

export function createAppRouter(appController: AppController): Router {
  const router = Router();

  router.post("/", appController.createApp.bind(appController));
  router.get("/", appController.getAllApps.bind(appController));
  router.get("/:appId", appController.getAppById.bind(appController));
  router.put("/:appId", appController.updateApp.bind(appController));
  router.delete("/:appId", appController.deleteApp.bind(appController));

  router.get("/:appId/screenshots", appController.getAppScreenshots.bind(appController));

  return router;
}
