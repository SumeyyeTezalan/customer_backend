// 'use strict';
// const bcrypt = require('bcrypt');
// const bcrypt_p = require('bcrypt-promise');
// const jwt = require('jsonwebtoken');
// const { TE, to } = require('../services/util.service');
// const CONFIG = require('../config/config');

// module.exports = (sequelize, DataTypes) => {
//     var User = sequelize.define('User', {
//         id: {
//             primaryKey: true,
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4
//         },
   
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },

//         password: {
//             type: DataTypes.STRING
//         },

//         phoneNumber: {
//             type: DataTypes.STRING
//         },
        
//         userName: {
//             type: DataTypes.STRING
//         },

//         role: {
//             type: DataTypes.STRING
//         },

//         identitycard: {
//             type: DataTypes.INTEGER
//         },

//         TC: {
//             type: DataTypes.STRING
//         },
//         fingerprint: {
//             type: DataTypes.STRING
//         },
//         isActive: {
//             type: DataTypes.BOOLEAN
//         },
//     });

//     User.beforeSave(async (user, options) => {
//         let err;
//         if (user.changed('password')) {
//             let salt, hash
//             [err, salt] = await to(bcrypt.genSalt(10));
//             if (err) TE(err.message, true);

//             [err, hash] = await to(bcrypt.hash(user.password, salt));
//             if (err) TE(err.message, true);

//             user.password = hash;
//         }
//     });

//     User.prototype.comparePassword = async function (pw) {
//         let err, pass
//         if (!this.password) TE('password not set');

//         [err, pass] = await to(bcrypt_p.compare(pw, this.password));
//         if (err) TE(err);

//         if (!pass) TE('invalid password');

//         return this;
//     }

//     User.prototype.getJWT = function () {
//         let expiration_time = parseInt(CONFIG.jwt_expiration);
//         return "Bearer " + jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
//     };

//     User.prototype.toWeb = function (pw) {
//         let json = this.toJSON();
//         return json;
//     };

//     return User;
// };
