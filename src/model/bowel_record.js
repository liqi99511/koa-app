const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');

const BowelRecord = sequelize.define('BowelRecord', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, comment: '用户ID' },
    record_time: { type: DataTypes.DATE, comment: '排便时间' },
    duration: { type: DataTypes.INTEGER, comment: '持续时间（分钟）' },
    stool_type: { type: DataTypes.INTEGER, comment: '大便类型（1-4型）' },
    notes: { type: DataTypes.TEXT, comment: '备注' }
},{
    comments: '排便记录表',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

BowelRecord.sync();

module.exports = BowelRecord;
