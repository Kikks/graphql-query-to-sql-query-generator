"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("DescartesV2States", {
			block_hash: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			constants: {
				type: Sequelize.ARRAY(Sequelize.UUID),
				allowNull: false
			},
			initial_epoch: {
				type: Sequelize.STRING,
				allowNull: false
			},
			finalized_epochs: {
				type: Sequelize.ARRAY(Sequelize.UUID),
				current_epoch: Sequelize.UUID,
				allowNull: false
			},
			current_epoch: {
				type: Sequelize.UUID,
				allowNull: false
			},
			current_phase: {
				type: Sequelize.STRING,
				output_state: Sequelize.UUID,
				allowNull: false
			},
			output_state: {
				type: Sequelize.UUID,
				allowNull: false
			},
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
		await queryInterface.dropTable("DescartesV2States");
	}
};