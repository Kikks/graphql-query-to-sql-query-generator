"use strict";
import { Model } from "sequelize";

interface CartesiMachineHash {
	data: string;
}

interface Report {
	payload: string;
}

interface ProcessedInputAttributes {
	session_id: string;
	epoch_index: string;
	input_index: string;
	most_recent_machine_hash: string;
	voucher_hashes_in_epoch: string;
	notice_hashes_in_epoch: string;
	skip_reason: string;
	reports: Report[];
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class ProcessedInput extends Model<ProcessedInputAttributes>
		implements ProcessedInputAttributes {
		session_id!: string;
		epoch_index!: string;
		input_index!: string;
		most_recent_machine_hash!: string;
		voucher_hashes_in_epoch!: string;
		notice_hashes_in_epoch!: string;
		skip_reason!: string;
		reports!: Report[];
		createdAt!: string;
		updatedAt!: string;

		static associate(models: any) {
		}
	}
	ProcessedInput.init(
		{
			session_id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			epoch_index: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			input_index: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			most_recent_machine_hash: {
				type: DataTypes.STRING,
				allowNull: false
			},
			voucher_hashes_in_epoch: {
				type: DataTypes.UUID,
				allowNull: false
			},
			notice_hashes_in_epoch: {
				type: DataTypes.UUID,
				allowNull: false
			},
			reports: {
				type: DataTypes.JSON,
				allowNull: false
			},
			skip_reason: {
				type: DataTypes.STRING,
				allowNull: false
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
			modelName: "ProcessedInput"
		}
	);
	return ProcessedInput;
};
