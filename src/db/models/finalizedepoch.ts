"use strict";
import { Model, UUIDV4 } from "sequelize";

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
    finalized_block_hash!: string;
    finalized_block_number!: number;

    static associate(models: any) {
      FinalizedEpoch.hasOne(models.EpochInputState, { as: "finalized_epoch" });
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      finalized_block_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalized_block_number: {
        type: DataTypes.INTEGER,
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
