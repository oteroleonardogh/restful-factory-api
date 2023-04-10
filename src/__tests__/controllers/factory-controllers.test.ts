import { Request, Response } from 'express';
import { logger } from '../../services/logger.service';
import { importFactoriesService, getFactoriesService } from '../../services';
import {
  importFactories,
  getFactories,
} from '../../controllers/factory.controller';
import { FactorySearchCriteria } from '../../types';

jest.mock('../../services/logger.service');
jest.mock('../../services');
jest.mock('../../utils/services/search-criteria');

const reqMock = {
  params: {},
} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('factory-controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('importFactories', () => {
    it('should handle importFactoriesService response correctly', async () => {
      (importFactoriesService as jest.Mock).mockResolvedValue({
        status: {
          code: 200,
          message: 'Success',
        },
      });

      await importFactories(reqMock, resMock);

      expect(importFactoriesService).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith({ message: 'Success' });
    });

    it('should handle internal errors', async () => {
      (importFactoriesService as jest.Mock).mockRejectedValue(
        new Error('Internal error'),
      );

      await importFactories(reqMock, resMock);

      expect(importFactoriesService).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: 'Internal error, please contact an administrator',
      });
    });
  });

  describe('getFactories', () => {
    it('should handle getFactoriesService response correctly', async () => {
      reqMock.params = { id: '1' };
      const searchCriteria: FactorySearchCriteria = { id: '1' };
      (getFactoriesService as jest.Mock).mockResolvedValue({
        status: {
          code: 200,
        },
        data: [{ id: '1', name: 'Factory 1' }],
      });

      await getFactories(reqMock, resMock);

      expect(getFactoriesService).toHaveBeenCalledWith(searchCriteria);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith({
        factory: { id: '1', name: 'Factory 1' },
      });
    });

    it('should handle internal errors', async () => {
      reqMock.params = { id: '1' };
      const searchCriteria: FactorySearchCriteria = { id: '1' };
      (getFactoriesService as jest.Mock).mockRejectedValue(
        new Error('Internal error'),
      );

      await getFactories(reqMock, resMock);

      expect(getFactoriesService).toHaveBeenCalledWith(searchCriteria);
      expect(logger.error).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: 'Internal error, please contact an administrator',
      });
    });
  });
});
