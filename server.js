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

var niceWords = ["amazing", "awesome", "blithesome", "excellent", "fabulous", "fantastic", "favorable", "fortuitous", "great", "incredible", "ineffable", "mirthful", "outstanding", "perfect", "propitious", "remarkable", "smart", "spectacular", "splendid", "stellar", "stupendous", "super", "ultimate", "unbelievable", "wondrous"];

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

var validator = function (req) {
  let text = req.body.feedback;         /* ezt még validálni kell */
  let scale = parseInt(req.body.scale);
  let email = req.body.email;

  // function findNiceWords () {
  //   niceWords.forEach
  // };

  if (email.indexOf != -1  && scale >= 10) {
    return true;
  } else {
    return false;
  };
};

module.exports = validator;

app.post('/exam', function(req, res) {
  console.log(req.body);
  console.log(validator(req));
  if (validator(req) == true) {
    connection.query({
      sql: 'SELECT project_name FROM projects'},
      function sendBackProjects(err, rows) {
        console.log(rows);
      if (err) {
        console.log(err.toString());
        return;
      }
      let content = rows.map(function (e) {
        return e.project_name;
      });
      console.log("yeah");
      res.send({"status": "ok", "projects": content});
      console.log({"status": "ok", "projects": content});
    });
  } else {
    res.send({"status": "error", "message": "thank you"});
  }

});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Server running on port %d', port);
});
