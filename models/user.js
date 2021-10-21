const {Sequelize} = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.CHAR(60),
        allowNull: false,
    }
});

module.exports = User;