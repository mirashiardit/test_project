import express from "express";
import cors from "cors";
import 'reflect-metadata';

import envConfig from "./helpers/environment-config.helper";
import { AppController } from "./controllers/app.controller";
import { createAppRouter } from "./routes/app.routes";
import container from "./dependencies";

// Initializing the app routes

const appController = container.resolve<AppController>("AppController");

const appRouter = createAppRouter(appController);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/apps", appRouter);

app.get("/", (req: any, res: any) => {
  return res.json({
    status: "okay",
  });
});

const port = envConfig.get("SERVER_PORT")
  ? Number(envConfig.get("SERVER_PORT"))
  : 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
