import { Router } from 'express';
import * as fs from 'fs';
import { logger } from '../services/logger.service';

const router = Router();
const routeFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== 'index.ts' && file.endsWith('.route.ts'));

const loadRoutes = (app: any) => {
  logger.info(`Starting routes loading...`);
  for (const file of routeFiles) {
    logger.info(`Adding ${file} to App routing`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`./${file}`).default;
    route(router);
  }

  app.use('/', router);
};

export default loadRoutes;
