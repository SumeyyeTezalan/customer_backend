'use strict';
// const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING
        },

        isEmployee: {
            type: DataTypes.BOOLEAN
        },

    });


    return User;
};
