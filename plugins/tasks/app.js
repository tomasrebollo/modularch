/**
 * Created by trebollo on 5/2/16.
 */

var path        = require('path');
var express     = require('express');
var router      = require('./routes/routes');
var taskManager = require('./taskManager');
var moduleDefs  = require('./package.json');

/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function TaskApp () {
    this.router = router;
}

TaskApp.prototype.init = function (app) {
    console.log('Initializing plugin Task App ...');
    // Configure the express router
    app.use('/' + moduleDefs.name, express.static(path.resolve(__dirname)));
    app.use('/' + moduleDefs.name, router);
}

// Expose this as a singleton
module.exports = new TaskApp();
