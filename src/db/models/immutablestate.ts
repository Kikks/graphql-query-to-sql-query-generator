"use strict";
import { Model, UUIDV4 } from "sequelize";

interface ImmutableStateAttributes {
  id: string;
  input_duration: number;
  challenge_period: number;
  contract_creation_timestamp: number;
  input_contract_address: string;
  output_contract_address: string;
  validator_contract_address: string;
  dispute_contract_address: string;
  descartesv2_contract_address: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ImmutableState extends Model<ImmutableStateAttributes>
    implements ImmutableStateAttributes {
    id!: string;
    input_duration!: number;
    challenge_period!: number;
    contract_creation_timestamp!: number;
    input_contract_address!: string;
    output_contract_address!: string;
    validator_contract_address!: string;
    dispute_contract_address!: string;
    descartesv2_contract_address!: string;

    static associate(models: any) {
      // define association here
    }
  }
  ImmutableState.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      input_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      challenge_period: {
        type: DataTypes.INTEGER,
      },
      contract_creation_timestamp: {
        type: DataTypes.INTEGER,
      },
      input_contract_address: {
        type: DataTypes.STRING,
      },
      output_contract_address: {
        type: DataTypes.STRING,
      },
      validator_contract_address: {
        type: DataTypes.STRING,
      },
      dispute_contract_address: {
        type: DataTypes.STRING,
      },
      descartesv2_contract_address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "ImmutableState",
    }
  );
  return ImmutableState;
};
