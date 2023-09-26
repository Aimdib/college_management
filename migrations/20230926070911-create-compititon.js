'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compititons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      day:{
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time:{   
             type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      numberOfQuestions:{
        type: Sequelize.INTEGER

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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('compititons');
  }
};