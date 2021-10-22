'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Phone.init({
    name: {
      type: Sequelize.STRING(80),
      allowNull: false,
      unique: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    releaseDate: {
      type: Sequelize.DATE,
    }
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};