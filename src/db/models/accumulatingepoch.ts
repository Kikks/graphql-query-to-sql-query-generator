"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EpochInputStateAttributes } from "./epochinputstate";

interface AccumulatingEpochAttributes {
  id: string;
  epoch_number: number;
  descartesv2_contract_address: string;
  input_contract_address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AccumulatingEpoch extends Model<AccumulatingEpochAttributes>
    implements AccumulatingEpochAttributes {
    id!: string;
    epoch_number!: number;
    inputs!: EpochInputStateAttributes;
    descartesv2_contract_address!: string;
    input_contract_address!: string;

    static associate(models: any) {
      AccumulatingEpoch.hasOne(models.EpochInputState, { foreignKey: "id" });
    }
  }
  AccumulatingEpoch.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      epoch_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descartesv2_contract_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      input_contract_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AccumulatingEpoch",
    }
  );
  return AccumulatingEpoch;
};
