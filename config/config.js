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
        "username": "postgres",
        "password": "postgres",
        "database": "rhtask",
        "host": "postgres",
        "port": "5432",
        "logging": true,
        "dialect": "postgres"
    },
    "production": {
        "username": process.env.PG_USERNAME,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DATABASE,
        "host": process.env.PG_HOST,
        "logging": true,
        "dialect": "postgres"
    }
};
