"use strict";
import { Model, UUID } from "sequelize";

interface VoucherAttributes {
	session_id: string;
	epoch_index: string;
	input_index: string;
	voucher_index: string;
	keccak: string;
	Address: string;
	payload: string;
	keccak_in_voucher_hashes: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class Voucher extends Model<VoucherAttributes> implements VoucherAttributes {
		session_id!: string;
		epoch_index!: string;
		input_index!: string;
		voucher_index!: string;
		keccak!: string;
		Address!: string;
		payload!: string;
		keccak_in_voucher_hashes!: string;
		createdAt!: string;
		updatedAt!: string;

		static associate(models: any) {
			// define association here
		}
	}
	Voucher.init(
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
			voucher_index: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			keccak: {
				type: DataTypes.STRING,
				allowNull: false
			},
			Address: {
				type: DataTypes.STRING,
				allowNull: false
			},
			payload: {
				type: DataTypes.STRING,
				allowNull: false
			},
			keccak_in_voucher_hashes: {
				type: DataTypes.UUID,
				allowNull: false
			},
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
			modelName: "Voucher"
		}
	);
	return Voucher;
};
