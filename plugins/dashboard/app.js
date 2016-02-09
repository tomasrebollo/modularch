/**
 * Created by trebollo on 5/2/16.
 */

var path        = require('path');
var express     = require('express');
var router      = require('./routes/routes');
var moduleDefs  = require('./package.json');

/**
 * Dashboard application.
 * @constructor
 */
function DashboardApp () {
    this.router = router;
}

DashboardApp.prototype.init = function (app) {
    console.log('Initializing plugin Dashboard ...');
    // Configure the express router
    app.use('/' + moduleDefs.name, express.static(path.resolve(__dirname)));
    app.use('/' + moduleDefs.name, router);
}

// Expose this as a singleton
module.exports = new DashboardApp();
