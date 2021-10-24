require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.PG_USERNAME,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DATABASE,
        "host": process.env.PG_HOST,
        "port": process.env.PG_PORT,
        "logging": true,
        "dialect": "postgres"
    },
    "test": {
        "username": process.env.PG_USERNAME,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DATABASE,
        "host": process.env.PG_HOST,
        "port": process.env.PG_PORT,
        "logging": true,
        "dialect": "postgres"
    },
    "ci": {
        "username": process.env.PG_USERNAME,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DATABASE,
        "host": "postgres",
        "port": process.env.PG_PORT,
        "logging": true,
        "dialect": "postgres"
    }
};
