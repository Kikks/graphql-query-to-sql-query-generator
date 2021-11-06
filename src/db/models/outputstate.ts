"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OutputStateAttributes {
	id: string;
	output_address: string;
	outputs: {
		integer: {
			integer: {
				integer: boolean;
			};
		};
	};
	descartes_hash: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class OutputState extends Model<OutputStateAttributes>
		implements OutputStateAttributes {
		id!: string;
		output_address!: string;
		outputs!: {
			integer: {
				integer: {
					integer: boolean;
				};
			};
		};
		descartes_hash!: string;
		createdAt!: string;
		updatedAt!: string;
	}
	OutputState.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			output_address: {
				type: DataTypes.STRING,
				allowNull: false
			},
			outputs: {
				type: DataTypes.JSON,
				allowNull: false
			},
			descartes_hash: DataTypes.UUID,
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			}
		},
		{
			sequelize,
			modelName: "OutputState"
		}
	);
	return OutputState;
};
