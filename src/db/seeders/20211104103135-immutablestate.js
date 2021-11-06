"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"ImmutableStates",
			[
				{
					id: uuidv4(),
					input_duration: 1000,
					challenge_period: 2000,
					contract_creation_timestamp: 3000,
					input_contract_address: "Address 1",
					output_contract_address: "Address 1",
					validator_contract_address: "Address 1",
					dispute_contract_address: "Address 1",
					descartesv2_contract_address: "Address 1",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: uuidv4(),
					input_duration: 4000,
					challenge_period: 5000,
					contract_creation_timestamp: 6000,
					input_contract_address: "Address 2",
					output_contract_address: "Address 2",
					validator_contract_address: "Address 2",
					dispute_contract_address: "Address 2",
					descartesv2_contract_address: "Address 2",
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("ImmutableStates", null, {});
	}
};
