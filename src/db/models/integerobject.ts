"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface IntegerObjectAttributes {
  id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class IntegerObject extends Model<IntegerObjectAttributes>
    implements IntegerObjectAttributes {
    id!: string;

    static associate(models: any) {
      IntegerObject.belongsTo(models.OutputState, {
        foreignKey: "IntegerObjectId",
        as: "IntegerObject",
      });
      IntegerObject.hasOne(models.IntegerInnerObject, {
        as: "IntegerInnerObject",
      });
    }
  }
  IntegerObject.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "IntegerObject",
    }
  );
  return IntegerObject;
};
