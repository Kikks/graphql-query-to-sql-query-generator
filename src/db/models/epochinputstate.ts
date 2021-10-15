"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface EpochInputStateAttributes {
  id: string;
  epoch_number: number;
  inputs: [number];
  input_contract_address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class EpochInputState extends Model<EpochInputStateAttributes>
    implements EpochInputStateAttributes {
    id!: string;
    epoch_number!: number;
    inputs!: [number];
    input_contract_address!: string;

    static associate(models: any) {
      EpochInputState.belongsTo(models.FinalizedEpoch, { foreignKey: "id" });
    }
  }
  EpochInputState.init(
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
      input_contract_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inputs: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      sequelize,
      modelName: "EpochInputState",
    }
  );
  return EpochInputState;
};
