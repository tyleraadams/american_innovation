var express = require('express');
var app = express();
var path = require('path');
var compression = require('compression');
var fs = require('fs');
var  db = require('./models/db');
var controllers = require('./controllers');
var bodyParser = require("body-parser");
// var favicon = require('serve-favicon');
var obj;
var yearInMs = 31536000000;

app.use(compression());


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public', { maxAge: yearInMs }));
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(controllers);
// app.get('/', function (req, res){
//   res.sendFile(path.join(__dirname+'/public/index.html'), { maxAge: yearInMs });
// });



app.listen(process.env.PORT || 3000);
