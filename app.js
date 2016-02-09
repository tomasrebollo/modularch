/**
 * Created by trebollo on 5/2/16.
 */

// Module dependencies
var express       = require('express');
var bodyParser    = require('body-parser');

var authRouter    = require('./routes/auth');
var indexRouter   = require('./routes/index');
var pluginsRouter = require('./routes/plugins');
var pluginManager = require('./pluginManager');

// Create an express application to manage the HTTP REST API
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define static resources
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/imgs'));

// Every request should be checked for authorisation first
app.use('*', authRouter);
app.use('/', indexRouter);
app.use('/plugins', pluginsRouter);

// Initialize the plugins manager
pluginManager.init(app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendStatus(err.status);
});

module.exports = app;
