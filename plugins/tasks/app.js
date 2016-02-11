/**
 * Created by trebollo on 5/2/16.
 */

var path         = require('path');
var express      = require('express');
var router       = require('./routes/routes');
var properties   = require('./package.json');
var tasksManager = require('./tasksManager');

/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function Tasks () {
    // This module Express router that handles the HTTP endpoints
    this.router = router;

    // This are all the elements this module or plugin provides. They must be defined with
    // same key name in package.json file, inside the plugins and providers property.
    this.providers = {
        TasksManager: tasksManager
    };
}

/**
 * Initializes everything.
 * @param app           The express main application.
 * @param consumers     A list containing all consumers this module or plugin needs.
 * @returns {{Array}}   Returns an array containing all providers. Each key matches the name specified in
 *                      package.json, by "plugin":{"providers":[]} property, and the value is the provider itself.
 */
Tasks.prototype.init = function (app, consumers) {
    console.log('Initializing plugin Task ...');

    // NOTE: Configure the consumers this module or plugin needs
    // i.e.: var provider = consumers.providerName;

    // Configure the express router
    app.use('/' + properties.name, express.static(path.resolve(__dirname)));
    app.use('/' + properties.name, router);
}

module.exports = Tasks;
