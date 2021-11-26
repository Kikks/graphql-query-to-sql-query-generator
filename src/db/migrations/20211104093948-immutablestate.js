"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ImmutableStates", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true
			},
			input_duration: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			challenge_period: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			contract_creation_timestamp: {
				type: Sequelize.DATE,
				allowNull: false
			},
			input_contract_address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			voucher_contract_address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			validator_contract_address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			dispute_contract_address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			descartesv2_contract_address: {
				type: Sequelize.STRING,
				allowNull: false
			},
			descartes_hash: Sequelize.STRING,
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("ImmutableStates");
	}
};
