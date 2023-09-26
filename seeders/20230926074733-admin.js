"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("students", [
  
      {
        name: "Admin",
        email: "ADMIN@GMAIL.COM",
        phone: "1234567890",
        countryCode: "+91",
        password: await bcrypt.hash("1234", 10),
        roleId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("students", null, {});
  },
};
