const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false }
},{
    comments: '用户表',
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    underscored: true, // 字段名使用下划线分隔
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

User.sync();

module.exports = User;