var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var unlock_character = require('./routes/unlock_character');
var get_characters = require('./routes/get_characters');
var team = require('./routes/team');
var match = require('./routes/match');
var index = require('./routes/index');
var disable_character = require('./routes/disable_character');
var login = require('./routes/login');

var app = express();

var pg = require('pg');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index)
app.use('/unlock_character', unlock_character);
app.use('/get_characters', get_characters);
app.use('/team', team);
app.use('/match', match);
app.use('/login', login);
app.use('/disable_character', disable_character)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*inventory.get("/", function (request, response){
  app.use("/", inventory());
});

purchases.get("/", function (request, response){
  app.use("/", purchases());
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
