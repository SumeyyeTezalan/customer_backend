var express = require('express');
var router = express.Router();
const cors = require('cors');
var app = express();
var bodyParser = require("body-parser");
var mqtt = require('mqtt');

const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');
const { User } = require('../models');

router.options('/adduser', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/obdgetweb', function (req, res, next) {

  console.log("OBD WEB REQ")

  var response = { status: 1 }
  var mqttClient = mqtt.connect('mqtt://34.73.124.129:1883');
  mqttClient.on('connect', (connack) => {
    mqttClient.publish('emse-obdwebrequest', JSON.stringify(response));
  });
});

router.get('/getgpsweb', function (req, res, next) {

  console.log("GPS WEB REQ")

  var response = { status: 1 }
  var mqttClient = mqtt.connect('mqtt://34.73.124.129:1883');
  mqttClient.on('connect', (connack) => {
    mqttClient.publish('emse-gpswebrequest', JSON.stringify(response));
  });
});

router.post('/login', async function (req, res, next) {
  let user, err;
 console.log("DENE " ,req.body)
 console.log("DENEME 0" ,req.body.password)

  var deneme = await User.findOne({ where: { email: req.body.email, password: req.body.password } })

  

  console.log("DENEME 0" , deneme.id)
  // console.log("DENEME 0" , req.body.email)
  // [err, user] = await toString(authService.authUser(req.body));
  // console.log("Login Post Process", req.body);
  // if (err) return ReE(res, err, 422);

  if (deneme == null ){
    return ReE(res, err, 500);
  } 
  return ReS(res);
})

module.exports = router;

