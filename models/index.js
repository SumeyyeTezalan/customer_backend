// 'use strict';

// var fs = require('fs');
// var path = require('path');
// var Sequelize = require('sequelize');
// var basename = path.basename(__filename);
// var env = process.env.NODE_ENV || 'development';
// var db = {};

// const CONFIG = require('../config/config');

// const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
//   host: CONFIG.db_host,
//   dialect: CONFIG.db_dialect,
//   port: CONFIG.db_port,
//   operatorsAliases: false,
//   timezone: '+03:00',
//   define: {
//     timestamps: false
//   }
// });

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;

// // Import Models such that I can use them in the api just by importing 'db'
// //db.user = require('./user')(sequelize, Sequelize);






// module.exports = db;
