import { Request, Response } from 'express';
import {
  importSprocketsService,
  getSprocketsService,
  saveSprocketService,
} from '../services';
import { logger } from '../services/logger.service';
import { SprocketSearchCriteria } from '../types';
import { extractSearchCriteria } from '../utils/services/search-criteria';
const INTERNAL_ERROR = 'Internal error, please contact an administrator';

export const importSprockets = async (_req: Request, res: Response) => {
  try {
    const importResponse = await importSprocketsService();
    const logMsg = `importFactories service call response: ${JSON.stringify(
      importResponse,
    )}`;

    if (importResponse?.status) {
      const code = importResponse?.status?.code;

      if (code >= 200 && code < 207) {
        logger.info(logMsg);
      } else if (code == 207) {
        logger.warn(logMsg);
      } else {
        logger.error(logMsg);
      }

      const message = importResponse.status.message;
      res.status(importResponse.status.code).json({ message });
    } else {
      res.status(500).json({ message: INTERNAL_ERROR });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: INTERNAL_ERROR });
  }
};

export const getSprockets = async (req: Request, res: Response) => {
  const { id } = req.params;
  let searchCriteria: SprocketSearchCriteria = {};

  if (id) {
    searchCriteria = { id };
  } else {
    // todo: Consider to use a validation and extraction step instead of this
    searchCriteria = extractSearchCriteria<SprocketSearchCriteria>(req);
  }

  try {
    const { status, data } = await getSprocketsService(searchCriteria);

    let response: unknown =
      data?.length == 1 ? { sprocket: data[0] } : { sprockets: data };

    if (status.code > 299) {
      response = { message: status.message };
    }

    res.status(status.code).json(response);
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ message: 'Internal error, please contact an administrator' });
  }
};

export const saveSprocket = async (req: Request, res: Response) => {
  const sprocket = req.body;
  try {
    const response = await saveSprocketService(sprocket);
    res
      .status(response?.status?.code || 500)
      .json(response?.status || { message: 'Internal Error!' });
  } catch (error) {
    logger.error(error);
    res
      .status(500)
      .json({ message: 'Internal error, please contact an administrator' });
  }
};
