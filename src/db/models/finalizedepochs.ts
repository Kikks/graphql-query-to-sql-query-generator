"use strict";
import { Model, UUIDV4 } from "sequelize";
import {FinalizedEpochAttributes} from './finalizedepoch'

interface FinalizedEpochsAttributes {
  id: string;
  initial_epoch: number;
  descartesv2_contract_address: string;
  input_contract_address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class FinalizedEpochs extends Model<FinalizedEpochsAttributes>
    implements FinalizedEpochsAttributes {
    id!: string;
    initial_epoch!: number;
    descartesv2_contract_address!: string;
    input_contract_address!: string;
    
    static associate(models: any) {
      FinalizedEpochs.hasMany(models.FinalizedEpoch, {
        as: 'finalized_epochs'
      })
    }
  }
  FinalizedEpochs.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      initial_epoch: {
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
      modelName: "FinalizedEpochs",
    }
  );
  return FinalizedEpochs;
};
