"use strict";
const { v4: uuidv4 } = require("uuid");

const taintStatusId1 = uuidv4();
const taintStatusId2 = uuidv4();

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"TaintStatuses",
			[
				{
					id: taintStatusId1,
					error_code: 200,
					error_message: "Successful",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					id: taintStatusId2,
					error_code: 400,
					error_message: "Error",
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);

		await queryInterface.bulkInsert(
			"SessionStatuses",
			[
				{
					session_id: uuidv4(),
					active_epoch_index: 400,
					epoch_index: [300, 400, 500],
					taint_status: taintStatusId1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					session_id: uuidv4(),
					active_epoch_index: 700,
					epoch_index: [600, 700, 800],
					taint_status: taintStatusId2,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("SessionStatuses", null, {});
	}
};
