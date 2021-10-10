import App from './app';
import http from 'http';
import { urlRoutes } from './routes';
import { MongoConnection } from './infra/database/mongoConnection';

const database = new MongoConnection();
const appInstance = new App({ urlRoutes });

database.connect();
const app = appInstance.getApp;
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
