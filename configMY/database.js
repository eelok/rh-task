const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rhtask", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"
});


module.exports = sequelize;