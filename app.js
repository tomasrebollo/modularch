/**
 * Created by trebollo on 5/2/16.
 */

// Module dependencies
var express       = require('express');
var bodyParser    = require('body-parser');

var indexRouter   = require('./routes/indexRouter');
var authRouter    = require('./routes/authRouter');
var dataRouter    = require('./routes/dataRouter');
var pluginsRouter = require('./routes/pluginsRouter');

var dataManager   = require('./dataManager');
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
app.use('/data', dataRouter);
app.use('/plugins', pluginsRouter);

// Initialize the managers
dataManager.init(app);
pluginManager.init(app);

// Catch 404 and forward to error handler.
// NOT: This needs to be established at the end in order to not
// overwrite possible routes definitions made by plugins or other modules.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendStatus(err.status);
});

module.exports = app;
