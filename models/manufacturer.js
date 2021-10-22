'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manufacturer.hasMany(models.Phone, {
        foreignKey: 'manufacturerId'
      });
    }
  }
  Manufacturer.init({
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    location: {
      type: Sequelize.STRING(500),
    }
  }, {
    sequelize,
    modelName: 'Manufacturer',
  });
  return Manufacturer;
};