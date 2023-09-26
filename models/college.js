'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class college extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  college.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    directorName: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'college',
  });
  return college;
};