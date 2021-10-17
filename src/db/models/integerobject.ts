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
      IntegerObject.hasOne(models.IntegerInnerObject, {
        as: "integer_object",
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
