import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import cors from "cors";
import { synRoutes } from "./routes/synonym-routes";

export const createServer = (): Express => {
  const app = express();
  app
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use('/api', synRoutes);

  return app;
};
