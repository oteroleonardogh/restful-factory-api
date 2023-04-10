import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const dialectOptions =
  process.env.NODE_ENV !== 'production'
    ? {
        //ssl: { rejectUnauthorized: false }
        ssl: false,
      }
    : undefined;

const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions,
    logging: false,
  },
);

export default sequelize;
