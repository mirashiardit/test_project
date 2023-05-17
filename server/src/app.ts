import express from "express";

import envConfig from "./helpers/environment-config.helper";
import { AppRepository } from "./core/repositories/app.repository";
import { AppService } from "./core/services/app.service";
import { AppController } from "./controllers/app.controller";
import { createAppRouter } from "./routes/app.routes";
import { BrowserService } from "./core/services/browser.service";


// Initializing the app routes

const appRepository = new AppRepository();

const browserService = new BrowserService()

const appService = new AppService(appRepository, browserService);

const appController = new AppController(appService);

const appRouter = createAppRouter(appController)


const app = express();

app.use(express.json());
app.use('/apps', appRouter);


app.get("/", (req: any, res: any) => {
  return res.json({
    status: "okay"
  })
})


const port = envConfig.get("SERVER_PORT") ? Number(envConfig.get("SERVER_PORT")) : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
