/**
 * Created by trebollo on 5/2/16.
 */

//Module dependencies
var express     = require('express');
var bodyParser  = require('body-parser');

// Define an object that represents the App. This object will hold
// all needed data susceptible to be used by any other module
var app = {};

// Create an express application to manage the HTTP REST API
app.server = express();
app.server.use(bodyParser.json());
app.server.use(bodyParser.urlencoded({ extended: false }));

// Catch 404 and forward to error handler
app.server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;
