"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface EpochInputStateAttributes {
	id: string;
	epoch_number: number;
	inputs: [string];
	input_contract_address: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class EpochInputState extends Model<EpochInputStateAttributes>
		implements EpochInputStateAttributes {
		id!: string;
		epoch_number!: number;
		inputs!: [string];
		input_contract_address!: string;
		createdAt!: string;
		updatedAt!: string;

		static associate(models: any) {
			EpochInputState.hasOne(models.FinalizedEpoch, {
				foreignKey: "epochInputStateId"
			});
			EpochInputState.hasOne(models.AccumulatingEpoch, {
				foreignKey: "epochInputStateId"
			});
		}
	}
	EpochInputState.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			epoch_number: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			input_contract_address: {
				type: DataTypes.STRING,
				allowNull: false
			},
			inputs: {
				type: DataTypes.ARRAY(DataTypes.UUID)
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			}
		},
		{
			sequelize,
			modelName: "EpochInputState"
		}
	);
	return EpochInputState;
};
