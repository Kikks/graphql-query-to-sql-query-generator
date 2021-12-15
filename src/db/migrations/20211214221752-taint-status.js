'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TaintStatuses", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			error_code: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			error_message: {
				type: Sequelize.STRING,
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
    await queryInterface.dropTable('TaintStatuses');
  }
};