"use strict";
import { Model, UUIDV4 } from "sequelize";

interface FinalizedEpochsAttributes {
	id: string;
	initial_epoch: string;
	dapp_contract_address: string;
	rollups_hash: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class FinalizedEpochs extends Model<FinalizedEpochsAttributes>
		implements FinalizedEpochsAttributes {
		id!: string;
		initial_epoch!: string;
		dapp_contract_address!: string;
		rollups_hash!: string;
		createdAt!: string;
		updatedAt!: string;

		static associate(models: any) {
			FinalizedEpochs.hasMany(models.FinalizedEpoch, {
				as: "finalized_epochs"
			});
		}
	}
	FinalizedEpochs.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			initial_epoch: {
				type: DataTypes.STRING,
				allowNull: false
			},
			dapp_contract_address: {
				type: DataTypes.STRING,
				allowNull: false
			},
			rollups_hash: DataTypes.STRING,
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: "FinalizedEpochs"
		}
	);
	return FinalizedEpochs;
};
