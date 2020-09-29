'use strict';
// const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Ticket = sequelize.define('Ticket', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        message: {
            type: DataTypes.STRING
        },

        status: {
            type: DataTypes.BOOLEAN
        },
        customerId: {
            type: DataTypes.INTEGER
        },
        customerName: {
            type: DataTypes.STRING
        },


    });


    return Ticket;
};
