var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//parser----------------------------------------------------------------
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//----------------------------------------------------------------------------

app.use(express.static('site'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencodedParser);

//database--------------------------------------------------------------------
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  database: "web_db",
  user: "root",
  password: "sangreal1123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//site start-----------------------------------------------------------------
app.get('/', function (req, res) {
  res.sendFile('site/index.html');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

require('./routes.js')(app, con);
require('./controllers.js')(con);
