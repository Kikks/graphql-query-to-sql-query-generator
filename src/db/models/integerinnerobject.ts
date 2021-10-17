"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface IntegerInnerObjectAttributes {
  id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class IntegerInnerObject extends Model<IntegerInnerObjectAttributes>
    implements IntegerInnerObjectAttributes {
    id!: string;

    static associate(models: any) {
      IntegerInnerObject.belongsTo(models.IntegerObject, {
        foreignKey: "IntegerInnerObjectId",
        as: "IntegerInnerObject",
      });
      IntegerInnerObject.hasOne(models.IntegerBool, {
        as: "IntegerBool",
      });
    }
  }
  IntegerInnerObject.init(
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
      modelName: "IntegerInnerObject",
    }
  );
  return IntegerInnerObject;
};
