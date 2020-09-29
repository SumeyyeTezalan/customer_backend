const { to, ReE, ReS } = require('../services/util.service');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const url = require('url');

const { User } = require('../models')

const getAllUser = async function (req, res) {


    User.findAll().then(function (users) {
        console.log(users);
        res.send({ error: false, message: 'users list', data: users });
    }).catch(function (err) {
        console.log('Oops! something went wrong, : ', err);
    });
}
module.exports.getAllUser = getAllUser;


const getUserName = async function (req, res) {
    const Op = Sequelize.Op
    queryObject = url.parse(req.url,true).query;

    debugger;
    User.findOne({
        where: {
            name: {
                [Op.like]: '%' + req.query.search +'%'
            }
        }
    }).then(async (data) => {

        res.send({ error: false, message: 'users list', data: data });

    }).catch(function (err) {
        console.log('Oops! something went wrong, : ', err);
    });
}
module.exports.getUserName = getUserName;


