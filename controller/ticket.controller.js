const { Ticket, User } = require('../models')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const url = require('url');

const { to, ReE, ReS } = require('../services/util.service'); 
const bcrypt = require('bcrypt');


const getAllTickets = async function (req, res) {


	Ticket.findAll({
        where: {
            customerName: {
                [Op.like]: '%' + req.query.search +'%'
            }
        }
    }).then(function (ticket) {
        console.log(ticket);
        res.send({ error: false, message: 'ticket list', data: ticket });
    }).catch(function (err) {
        console.log('Oops! something went wrong, : ', err);
    });
}
module.exports.getAllTickets = getAllTickets;