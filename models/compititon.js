'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class compititon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  compititon.init({
    name: DataTypes.STRING,
    day: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    time: DataTypes.STRING,
    duration: DataTypes.STRING,
    numberOfQuestions: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'compititon',
  });
  return compititon;
};