"use strict";
import { Model, UUIDV4 } from "sequelize";

interface SessionStatusAttributes {
	session_id: string;
	active_epoch_index: number;
	epoch_index: [number];
	taint_status: string;
	createdAt: string;
	updatedAt: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class SessionStatus extends Model<SessionStatusAttributes>
		implements SessionStatusAttributes {
		session_id!: string;
		active_epoch_index!: number;
		epoch_index!: [number];
		taint_status!: string;
		createdAt!: string;
		updatedAt!: string;
	}
	SessionStatus.init(
		{
			session_id: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			active_epoch_index: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			epoch_index: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false
			},
			taint_status: {
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
			modelName: "SessionStatus"
		}
	);
	return SessionStatus;
};
