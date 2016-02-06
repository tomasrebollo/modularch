/**
 * Created by trebollo on 5/2/16.
 */

// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');

var authRouter = require('./routes/auth');
var pluginManager = require('./pluginManager');

// Create an express application to manage the HTTP REST API
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Every request should be checked for authorisation first
app.use('*', authRouter);

// Initialize the plugins manager
pluginManager.init(app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err);
});

module.exports = app;
