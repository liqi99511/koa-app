const { Sequelize } = require('sequelize');
const { mysql_option } = require('../config/db');
const { database, account: username, password, options } = mysql_option;
    
// 创建 Sequelize 实例，连接本地 MySQL
const sequelize = new Sequelize(database, username, password, options);

module.exports = sequelize;