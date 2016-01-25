// Babel ES6/JSX Compiler
require('babel-register');

var nconf = require('nconf');
var path = require('path');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');
var passport = require('passport');

// route 호출
var routes = require('./app/routes');
var auth = require('./routes/auth');
var user = require('./routes/user');
var message = require('./routes/message');
var memo = require('./routes/memo');
var socket = require('./routes/socket.js');

var app = express();

var server = http.createServer(app);

nconf.argv().env();
nconf.file({ file: 'config.json' });

// MongoDB
mongoose.connect(nconf.get('mongoUrl'));

// view engine setup
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Logger
app.use(logger('dev'));

// body-parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
// /api 로 시작하는 url 토큰체크함
app.all('/api/*',[require('./middlewares/validateRequest')]);

// routes 등록
app.use('/', auth);
app.use('/api/user', user);
app.use('/api/message', message);
app.use('/api/memo', memo);

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('view/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

/* Socket.io Communication */
var io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
