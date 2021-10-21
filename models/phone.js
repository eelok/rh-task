const {Sequelize} = require("sequelize");
const db = require("../config/database");

const Phone = db.define("Phone", {
    phone_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
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
});

module.exports = Phone;