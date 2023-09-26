'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  participation.init({
    competitionId: DataTypes.INTEGER,
    studentId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'participation',
  });
  return participation;
};