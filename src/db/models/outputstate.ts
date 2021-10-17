"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OutputStateAttributes {
  id: string;
  output_address: string;
  IntegerObjectId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class OutputState extends Model<OutputStateAttributes>
    implements OutputStateAttributes {
    id!: string;
    output_address!: string;
    IntegerObjectId!: string;

    static associate(models: any) {
      OutputState.hasOne(models.IntegerObject, { as: "IntegerObject" });
    }
  }
  OutputState.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      output_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IntegerObjectId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OutputState",
    }
  );
  return OutputState;
};
