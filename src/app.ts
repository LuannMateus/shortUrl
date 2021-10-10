import express from 'express';
import { ApplicationRoutes } from './routes/model/routesModel';

class App {
  private app;
  private routes;

  constructor(routes: ApplicationRoutes) {
    this.app = express();
    this.routes = routes;

    this.init();
  }

  init(): void {
    this.appMiddleware();
    this.appRoutes();
  }

  appRoutes() {
    this.app.use('/api/v1/', this.routes.urlRoutes);
  }

  appMiddleware(): void {
    this.app.use(express.json());
  }

  get getApp() {
    return this.app;
  }
}

export default App;
