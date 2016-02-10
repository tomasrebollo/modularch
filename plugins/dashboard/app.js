/**
 * Created by trebollo on 5/2/16.
 */

var path        = require('path');
var express     = require('express');
var router      = require('./routes/routes');
var properties  = require('./package.json');
var common      = require('./models/common');

/**
 * Dashboard application.
 * @constructor
 */
function Dashboard () {
    // This module Express router that handles the HTTP endpoints
    this.router = router;

    // Store a reference to this module properties defined in its package.json file
    this.properties = properties;

    // This are all the elements this module or plugin provides. They must be defined with
    // same key name in package.json file, inside the plugins and providers property.
    this.providers = { };
}

/**
 * Initializes everything.
 * @param app           The express main application.
 * @param consumers     A list containing all consumers this module or plugin needs.
 * @returns {{Array}}   Returns an array containing all providers. Each key matches the name specified in
 *                      package.json, by "plugin":{"providers":[]} property, and the value is the provider itself.
 */
Dashboard.prototype.init = function (app, consumers) {
    console.log('Initializing plugin Dashboard ...');

    // Extract required elements from the consumers list, injected by the Plugin Manager
    common.tasksManager = consumers.TasksManager;
    common.app = app;

    // Configure the express router
    app.use('/' + properties.name, express.static(path.resolve(__dirname)));
    app.use('/' + properties.name, router);
}

module.exports = Dashboard;
