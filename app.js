var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var server = require('http').Server(app);
// var io = require('socket.io')(server);
var io = require('socket.io')(server);
var cors = require('cors');
var mysql = require('mysql');


var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://34.73.124.129:1883');


app.use(cors());
app.use(cors({
  allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type', 'Access-Control-Allow-Origin', '*'],
  credentials: true,
  origin:true,
  //for socket.io's cors
  origin: (origin, callback) => {
    return callback(null, true);
  }
}));

// app.all('/*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });



app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(3000, function (req, res) {
  console.log("listen at 3000!");
});

// start mqtt
client.on('connect', function () {

  client.subscribe(['emse-gpsweb', 'emse-obdweb', 'emse-userentryweb', 'emse-obdwebrequest', 'emse-userlistrequest',
   'emse-userlistweb'], (err, granted) => {
    console.log("subscribed", err, granted);
  })

})

client.on('message', function (topic, message, packet) {
 
  console.log("message is received ", "topic: ", topic, " message: ", message.toString(), " packet: ", packet, " payload: ", packet.payload.toString());
  var json = JSON.parse(packet.payload);

  if (topic.startsWith("emse-gpsweb")) {

  

    var lat = json["latitude"]
    var long = json["longitude"]

    console.log("Emse Web " , json );
    console.log("Emse Web lat " , lat );
    io.emit('emse-gpsweb',
      `{"latitude": "${lat}", 
        "longitude": "${long}"
      }`);


  } else if (topic.startsWith("emse-obdweb")) {
    console.log("emse  obdweb" , json)
   var data = json["data"];
    io.emit('emse-obdweb',
      `{"data": "${data}"
      }`);

      console.log("DATA" , data)

  } else if (topic.startsWith("emse-userentryweb")) {
    var name = json["name"];
    var tc = json["tc"];
    var status = json["status"];
    console.log("userentryweb.." , json)
    console.log("userentryweb.." , name)

    io.emit('emse-userentryweb',
    `{"name": "${name}", 
      "tc": "${tc}", 
      "status": "${status}"
    }`);
  
  } else if (topic.startsWith("emse-userlistweb")) {   // benim attığım mesajlar gerek yok burada işlem yapmaya
  
    console.log("userlistweb..")

    var _isadmin = json["isadmin"];  // [ { tc, name, isAdmin }, { tc, name, isAdmin} ]
    var _tc = json["tc"];
    var _name = json["name"];

    io.emit('emse-userlistweb',
    `{"name": "${_name}", 
      "tc": "${_tc}", 
      "isadmin": "${_isadmin}"
    }`);
  
  }

})


client.on("error", (error) => {
  console.log("error is ", error);
});
io.on("error" ,(err) => {
  console.log("error........"  , err)
} )

io.on('connection', (socket) => {
 

  console.log("Socket CONNECTED")
  socket.on('emse-userlistrequest', (data) => {
    
    var response = { status: 1 }
    client.publish('emse-userlistrequest', JSON.stringify(response));

  });

  socket.on('emse-obdwebrequest', (data) => {
    
    var response = { status: 1 }
    client.publish('emse-obdwebrequest', JSON.stringify(response));

  });

  socket.on('emse-userwebrequest', (data) => {
    
    var response = { status: 1 }
    client.publish('emse-userwebrequest', JSON.stringify(response));

  });

  socket.on('emse-gpswebrequest', (data) => {
    
    var response = { status: 1 }
    client.publish('emse-gpswebrequset', JSON.stringify(response));

  });

  socket.on('emse-newobd', (data) => {
    
    console.log("NEW OBD DATA-*-*-*-*" , data)
    client.publish('emse-newobd', JSON.stringify(data));

  });

  socket.on("disconnect", () => console.log("Client disconnected"));


});


// end socket.io


// start DB
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mysql",
//   database : 'servistakip'
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// con.query('SELECT * from servistakip.cars', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
// end DB

module.exports = app;