"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface IntegerBoolAttributes {
  id: string;
  integer: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class IntegerBool extends Model<IntegerBoolAttributes>
    implements IntegerBoolAttributes {
    id!: string;
    integer!: boolean;

    static associate(models: any) {
      IntegerBool.belongsTo(models.IntegerInnerObject, {
        foreignKey: "IntegerBoolId",
        as: "IntegerBool",
      });
    }
  }
  IntegerBool.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      integer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "IntegerBool",
    }
  );
  return IntegerBool;
};
