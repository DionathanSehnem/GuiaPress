const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const connection = new Sequelize(process.env.DATABASE_NAME, process.env.LOGIN, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DATABASE,
    timezone: '-03:00'
});

module.exports = connection;