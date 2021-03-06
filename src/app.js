var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var mongoLink = process.env.mongoLink || 'mongodb://172.19.100.244/hackathon';

mongoose.connect(mongoLink);

var routes = require('./routes/index');
var userApi = require('./routes/api/user/user');
var placeApi = require('./routes/api/place/place');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile)
app.set('view engine', 'html');
app.set('view cache', false)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'hack it, please ;)'
}));

app.use('/', routes);
app.use('/api/user/', userApi);
app.use('/api/place/', placeApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
