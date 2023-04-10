import { Request } from 'express';

function convertValue<U>(value: string): U[keyof U] | undefined {
  const numValue = Number(value);

  if (!isNaN(numValue)) {
    return numValue as unknown as U[keyof U];
  } else if (typeof value === 'string') {
    return value as unknown as U[keyof U];
  }

  return undefined;
}

export function extractSearchCriteria<U>(req: Request): U {
  const { id } = req.params;
  const queryParams = req.query as Record<keyof U, string>;
  const searchCriteria: Partial<U> = {};

  if (id) {
    searchCriteria['id' as keyof U] = id as unknown as U[keyof U];
  } else {
    const allowedKeys = Object.keys(queryParams) as Array<keyof U>;

    for (const key of allowedKeys) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        const value = queryParams[key];

        if (value) {
          searchCriteria[key] = convertValue<U>(value);
        }
      }
    }
  }

  return searchCriteria as U;
}
