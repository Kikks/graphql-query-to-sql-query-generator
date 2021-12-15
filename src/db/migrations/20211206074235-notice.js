"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Notices", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			session_id: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			epoch_index: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			input_index: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			notice_index: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true
			},
			keccak: {
				type: Sequelize.STRING,
				allowNull: false
			},
			Address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			payload: {
				type: Sequelize.STRING,
				allowNull: false
			},
			keccak_in_notice_hashes: {
				type: Sequelize.UUID,
				allowNull: false
			},
			input_result_id: Sequelize.UUID,
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Notices");
	}
};
