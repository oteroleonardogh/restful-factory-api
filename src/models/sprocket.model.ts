import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db/config/sequelize';
import { Sprocket } from '../types';

export class SprocketModel extends Model<Sprocket> implements Sprocket {
  public id!: string;
  public teeth!: number;
  public pitchDiameter!: number;
  public outsideDiameter!: number;
  public pitch!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public _options!: {
    isNewRecord: boolean;
  };
}

SprocketModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.fn('uuid_generate_v4'),
    },
    teeth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pitchDiameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    outsideDiameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pitch: {
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
    tableName: 'sprockets',
    modelName: 'sprockets',
    timestamps: true,
    underscored: true,
  },
);
