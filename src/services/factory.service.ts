import { v4 as uuidv4 } from 'uuid';

import {
  Factory,
  FactorySearchCriteria,
  ServiceResponse,
  Status,
} from '../types';
import { FactoryModel } from '../models/factory.model';
import { logger } from './logger.service';
import factoryData from '../db/seeders/seed_factory_data.json';

export const importFactoriesService = async function (): Promise<Status> {
  logger.info('Importing factories from JSON data...');
  let totalRecords = 0;
  let storedRecords = 0;
  let code = 200;
  let message = 'Success!';

  // Loop through the factories in the JSON data and create new FactoryModel objects
  for (const element of factoryData.factories) {
    const chartData = element?.factory?.chart_data;
    const dataLength = chartData?.sprocket_production_actual?.length || 0;
    for (let i = 0; i < dataLength; i++) {
      totalRecords++;
      try {
        await FactoryModel.create({
          id: uuidv4(),
          sprocketProductionActual: chartData.sprocket_production_actual[i],
          sprocketProductionGoal: chartData.sprocket_production_goal[i],
          time: chartData.time[i],
        });
        storedRecords++;
      } catch (error) {
        // todo: Validate partial processing is OK
        // Consume current error enabling to keep processing factories
        logger.warn(
          `Error importing factory chart_data: ${JSON.stringify(
            chartData,
          )} - cause: ${error}`,
        );
      }
    }
  }

  if (totalRecords && storedRecords == totalRecords) {
    code = 201; // All entries created successfully!
    message = `Success ${totalRecords} processed from JSON correctly!`;
  } else if (storedRecords < totalRecords) {
    if (storedRecords) {
      // todo: check if partial processing is OK
      // Assuming partial processing is OK
      code = 207;
      message = `Warning ${
        totalRecords - storedRecords
      } from ${totalRecords} were not processed from JSON correctly!`;
    } else {
      code = 500;
      message = `Error ${
        totalRecords - storedRecords
      } from ${totalRecords} were not processed fron JSON correctly!`;
    }
  } else if (!totalRecords) {
    // todo: check this because no entries in the JSON file
    // may or may not be considered an error
    code = 500; // assumming error in this case
    message = `Error no data found in JSON file!`;
  }
  return { status: { code, message } };
};

export const saveFactoryService = async function (
  factory: Factory,
): Promise<void> {
  await FactoryModel.upsert(factory);
};

export const getFactoriesService = async function (
  where: FactorySearchCriteria,
): Promise<ServiceResponse> {
  const factories: Factory[] = await FactoryModel.findAll({ where });

  if (!factories?.length) {
    return { status: { code: 404, message: 'Factory not found!' } };
  }

  return { status: { code: 200 }, data: factories };
};
