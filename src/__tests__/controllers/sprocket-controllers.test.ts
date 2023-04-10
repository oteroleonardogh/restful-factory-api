import { Request, Response } from 'express';
import { logger } from '../../services/logger.service';
import {
  importSprocketsService,
  getSprocketsService,
  saveSprocketService,
} from '../../services';

import { SprocketSearchCriteria } from '../../types';
import {
  importSprockets,
  getSprockets,
  saveSprocket,
} from '../../controllers/sprocket.controller';

jest.mock('../../services/logger.service');
jest.mock('../../services');
jest.mock('../../utils/services/search-criteria');

const reqMock = {
  params: {},
  body: {},
} as unknown as Request;

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe('sprocket-controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('importSprocketsService', () => {
    it('should handle importSprockets response correctly', async () => {
      (importSprocketsService as jest.Mock).mockResolvedValue({
        status: {
          code: 200,
          message: 'Success',
        },
      });

      await importSprockets(reqMock, resMock);

      expect(importSprocketsService).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith({ message: 'Success' });
    });

    it('should handle internal errors', async () => {
      (importSprocketsService as jest.Mock).mockRejectedValue(
        new Error('Internal error'),
      );

      await importSprockets(reqMock, resMock);

      expect(importSprocketsService).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: 'Internal error, please contact an administrator',
      });
    });
  });

  describe('getSprockets', () => {
    it('should handle getSprocketsService response correctly', async () => {
      reqMock.params = { id: '1' };
      const searchCriteria: SprocketSearchCriteria = { id: '1' };
      (getSprocketsService as jest.Mock).mockResolvedValue({
        status: {
          code: 200,
        },
        data: [{ id: '1', name: 'Sprocket 1' }],
      });

      await getSprockets(reqMock, resMock);

      expect(getSprocketsService).toHaveBeenCalledWith(searchCriteria);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith({
        sprocket: { id: '1', name: 'Sprocket 1' },
      });
    });

    it('should handle internal errors', async () => {
      reqMock.params = { id: '1' };
      const searchCriteria: SprocketSearchCriteria = { id: '1' };
      (getSprocketsService as jest.Mock).mockRejectedValue(
        new Error('Internal error'),
      );

      await getSprockets(reqMock, resMock);

      expect(getSprocketsService).toHaveBeenCalledWith(searchCriteria);
      expect(logger.error).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: 'Internal error, please contact an administrator',
      });
    });
  });

  describe('saveSprocket', () => {
    it('should handle saveSprocketService response correctly', async () => {
      reqMock.body = { id: '1', name: 'Sprocket 1' };
      (saveSprocketService as jest.Mock).mockResolvedValue({
        status: {
          code: 200,
          message: 'Sprocket saved successfully',
        },
      });

      await saveSprocket(reqMock, resMock);

      expect(saveSprocketService).toHaveBeenCalledWith(reqMock.body);
      expect(resMock.status).toHaveBeenCalledWith(200);
      expect(resMock.json).toHaveBeenCalledWith({
        code: 200,
        message: 'Sprocket saved successfully',
      });
    });

    it('should handle internal errors', async () => {
      reqMock.body = { id: '1', name: 'Sprocket 1' };
      (saveSprocketService as jest.Mock).mockRejectedValue(
        new Error('Internal error'),
      );

      await saveSprocket(reqMock, resMock);

      expect(saveSprocketService).toHaveBeenCalledWith(reqMock.body);
      expect(logger.error).toHaveBeenCalled();
      expect(resMock.status).toHaveBeenCalledWith(500);
      expect(resMock.json).toHaveBeenCalledWith({
        message: 'Internal error, please contact an administrator',
      });
    });
  });
});
