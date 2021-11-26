"use strict";
import { Model, UUID } from "sequelize";

interface DescartesV2StateAttributes {
	block_hash: string;
	constants: string[];
	initial_epoch: string;
	current_epoch: string;
	current_phase: string;
	voucher_state: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class DescartesV2State extends Model<DescartesV2StateAttributes>
		implements DescartesV2StateAttributes {
		block_hash!: string;
		constants!: string[];
		initial_epoch!: string;
		current_epoch!: string;
		current_phase!: string;
		voucher_state!: string;
		createdAt!: string;
		updatedAt!: string;

		static associate(models: any) {
			DescartesV2State.hasMany(models.ImmutableState, {
				foreignKey: "descartes_hash"
			});
			DescartesV2State.hasOne(models.AccumulatingEpoch, {
				foreignKey: "descartes_hash"
			});
			DescartesV2State.hasOne(models.VoucherState, {
				foreignKey: "descartes_hash"
			});
		}
	}
	DescartesV2State.init(
		{
			block_hash: {
				type: DataTypes.UUID,
				defaultValue: UUID,
				allowNull: false,
				primaryKey: true
			},
			constants: DataTypes.ARRAY(DataTypes.UUID),
			initial_epoch: DataTypes.STRING,
			current_epoch: DataTypes.UUID,
			current_phase: DataTypes.STRING,
			voucher_state: DataTypes.UUID,
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			sequelize,
			modelName: "DescartesV2State"
		}
	);
	return DescartesV2State;
};
