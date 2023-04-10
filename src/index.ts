import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables using as fallback .env file

import { logger, loggerHttp } from './services';
import loadRoutes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(loggerHttp);
app.use(express.json());
loadRoutes(app);

// Handle 404 errors
app.use((req: Request, res: Response) => {
  const errMsg = 'Bad Request';
  logger.warn(`404 ${errMsg}`);
  res.status(404).send(errMsg);
});

// Handle 4xx errors
app.use(
  (
    err: { status: number; message: string },
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    loggerHttp(req, res);
    if (err.status >= 400 && err.status < 500) {
      logger.warn(`${err.status} ${err.message}`);
      res.status(err.status).send(err.message);
    } else {
      logger.error(`${err.status} Unknown Error`);
      next(err);
    }
  },
);

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
