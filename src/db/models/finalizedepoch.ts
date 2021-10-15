"use strict";
import { Model, UUIDV4 } from "sequelize";
import { EpochInputStateAttributes } from "./epochinputstate";

export interface FinalizedEpochAttributes {
  id: string;
  epoch_number: number;
  hash: number;
  finalized_block_hash: string;
  finalized_block_number: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class FinalizedEpoch extends Model<FinalizedEpochAttributes>
    implements FinalizedEpochAttributes {
    id!: string;
    epoch_number!: number;
    hash!: number;
    inputs!: EpochInputStateAttributes;
    finalized_block_hash!: string;
    finalized_block_number!: number;

    static associate(models: any) {
      FinalizedEpoch.belongsTo(models.FinalizedEpochs, { foreignKey: "id" });
      FinalizedEpoch.hasOne(models.EpochInputState, { foreignKey: "id" });
    }
  }
  FinalizedEpoch.init(
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
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalized_block_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalized_block_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FinalizedEpoch",
    }
  );
  return FinalizedEpoch;
};
