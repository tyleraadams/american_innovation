var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var fs = require('fs');
var  db = require('./models/db');
var controllers = require('./controllers');
var bodyParser = require("body-parser");
var schedule = require("./schedule");
// var favicon = require('serve-favicon');
var obj;
var yearInMs = 31536000000;

var dotenv = require('dotenv');


// There's no need to check if .env exists, dotenv will check this // for you. It will show a small warning which can be disabled when // using this in production.

dotenv.load();
app.use(compression());
app.enable('trust proxy');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'/*, { maxAge: yearInMs }*/));
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(controllers);
// app.get('/', function (req, res){
//   res.sendFile(path.join(__dirname+'/public/index.html'), { maxAge: yearInMs });
// });



app.listen(process.env.PORT || 3000);
