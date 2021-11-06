"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"OutputStates",
			[
				{
					id: uuidv4(),
					output_address: "Output address 1",
					outputs: `{ "intger": { "integer": { "integer": false } } }`,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: uuidv4(),
					output_address: "Output address 2",
					outputs: `{ "intger": { "integer": { "integer": false } } }`,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("OutputStates", null, {});
	}
};
