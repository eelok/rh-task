const {Sequelize} = require("sequelize");
const db = require("../config/database");


const Manufacturer = db.define("Manufacturer", {
    manufacturer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    location: {
        type: Sequelize.STRING(500),
    }
});


module.exports = Manufacturer;
