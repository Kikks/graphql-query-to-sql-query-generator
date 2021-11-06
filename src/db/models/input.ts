"use strict";
import { Model, UUIDV4 } from "sequelize";

interface InputAttributes {
	id: string;
	sender: string;
	timestamp: string;
	payload: string[];
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class Input extends Model<InputAttributes> implements InputAttributes {
		id!: string;
		sender!: string;
		timestamp!: string;
		payload!: string[];
		createdAt!: string;
		updatedAt!: string;
	}
	Input.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			sender: {
				type: DataTypes.STRING,
				allowNull: false
			},
			timestamp: {
				type: DataTypes.STRING,
				allowNull: false
			},
			payload: {
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
			modelName: "Input"
		}
	);
	return Input;
};
