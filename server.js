'use strict';

var mysql = require('mysql');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1988',
  database: 'secretprojects',
});

connection.connect(function connectMsql(error) {
  if (error) {
    console.log('Connection failed', error);
  } else {
    console.log('Successful');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.use(function use(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});




var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Server running on port %d', port);
});
