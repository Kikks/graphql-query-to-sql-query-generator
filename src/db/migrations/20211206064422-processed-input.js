"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ProcessedInputs", {
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
			most_recent_machine_hash: {
				type: Sequelize.STRING,
				allowNull: false
			},
			voucher_hashes_in_epoch: {
				type: Sequelize.UUID,
				allowNull: false
			},
			notice_hashes_in_epoch: {
				type: Sequelize.UUID,
				allowNull: false
			},
			reports: {
				type: Sequelize.JSON,
				allowNull: false
			},
			skip_reason: {
				type: Sequelize.STRING,
				allowNull: true
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("ProcessedInputs");
	}
};
