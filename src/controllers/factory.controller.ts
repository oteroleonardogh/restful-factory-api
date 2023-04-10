import { Request, Response } from 'express';
import { logger } from '../services/logger.service';
import { importFactoriesService, getFactoriesService } from '../services';
import { FactorySearchCriteria } from '../types';
import { extractSearchCriteria } from '../utils/services/search-criteria';
const INTERNAL_ERROR = 'Internal error, please contact an administrator';

export const importFactories = async (_req: Request, res: Response) => {
  try {
    const importResponse = await importFactoriesService();
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

export const getFactories = async (req: Request, res: Response) => {
  const { id } = req.params;
  let searchCriteria: FactorySearchCriteria = {};

  if (id) {
    searchCriteria = { id };
  } else {
    // todo: Consider to use a validation and extraction step instead of this
    searchCriteria = extractSearchCriteria<FactorySearchCriteria>(req);
  }

  try {
    const { status, data } = await getFactoriesService(searchCriteria);

    let response: unknown =
      data?.length == 1 ? { factory: data[0] } : { factorys: data };

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
