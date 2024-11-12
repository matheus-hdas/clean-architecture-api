import { Api } from "../api";
import { Route } from "./route/route";
import express, { Express } from "express";

export class ExpressApi implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: Route[]) {
    return new ExpressApi(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`[Server] Server running on port ${port}`);
    });
  }
}
