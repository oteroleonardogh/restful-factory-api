import { v4 as uuidv4 } from 'uuid';

import {
  ServiceResponse,
  Sprocket,
  SprocketSearchCriteria,
  Status,
} from '../types';
import { SprocketModel } from '../models/sprocket.model';
import { logger } from './logger.service';
import sprocketData from '../db/seeders/seed_sprocket_types.json';

export const importSprocketsService = async function (): Promise<Status> {
  logger.info('Importing sprocketes from JSON data...');
  let totalRecords = 0;
  let storedRecords = 0;
  let code = 200;
  let message = 'Success!';

  // Loop through the sprocketes in the JSON data and create new SprocketModel objects
  for (const sprocket of sprocketData.sprockets) {
    totalRecords++;
    try {
      await SprocketModel.create({
        id: uuidv4(),
        teeth: sprocket.teeth,
        pitchDiameter: sprocket.pitch_diameter,
        outsideDiameter: sprocket.outside_diameter,
        pitch: sprocket.pitch,
      });
      storedRecords++;
    } catch (error) {
      // todo: Validate partial processing is OK
      // Consume current error enabling to keep processing sprocketes
      logger.warn(
        `Error importing sprocket: ${JSON.stringify(
          sprocket,
        )} - cause: ${error}`,
      );
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

export const saveSprocketService = async function (
  sprocketToSave: Sprocket,
): Promise<ServiceResponse> {
  const [sprocket] = await SprocketModel.upsert(sprocketToSave, {
    returning: true,
    fields: ['teeth', 'pitchDiameter', 'outsideDiameter', 'pitch', 'updatedAt'],
  });

  return {
    status: {
      code: sprocketToSave.id ? 200 : 201,
      message: sprocketToSave.id
        ? 'Sprocket updated successfully!'
        : 'Sprocket created successfully!',
    },
    data: { sprocket },
  };
};

export const getSprocketsService = async function (
  where: SprocketSearchCriteria,
): Promise<ServiceResponse> {
  const sprockets: Sprocket[] = await SprocketModel.findAll({ where });
  if (!sprockets?.length) {
    return { status: { code: 404, message: 'Sprocket not found!' } };
  }

  return { status: { code: 200 }, data: sprockets };
};
