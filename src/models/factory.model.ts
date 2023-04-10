import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/config/sequelize';
import { Factory } from '../types';

export class FactoryModel extends Model<Factory> implements Factory {
  public id!: string;
  public sprocketProductionActual!: number;
  public sprocketProductionGoal!: number;
  public time!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

FactoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
    },
    sprocketProductionActual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sprocketProductionGoal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'factories',
    modelName: 'factories',
    timestamps: true,
    underscored: true,
  },
);
