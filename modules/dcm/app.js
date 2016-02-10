/**
 * Created by trebollo on 5/2/16.
 */

var path                = require('path');
var express             = require('express');
var properties          = require('./package.json');
var router              = require('./routes/routes');
var poolsRouter         = require('./routes/poolsRoutes');
var hostsRouter         = require('./routes/hostsRoutes');
var vmsRouter           = require('./routes/vmsRoutes');
var gameNodesRouter     = require('./routes/gameNodesRoutes');
var vmTemplatesRouter   = require('./routes/vmTemplatesRoutes');
var gpuTemplatesRouter  = require('./routes/gpuTemplatesRoutes');
var DataModel           = require('./dataModel');

/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function DCM (app) {
    // Handles real DCM data model
    this.data = new DataModel();

    // Configure the express router
    app.use('/' + properties.name, express.static(path.resolve(__dirname)));
    app.use('/' + properties.name, router);
    app.use('/' + properties.name + '/pools', poolsRouter);
    app.use('/' + properties.name + '/hosts', hostsRouter);
    app.use('/' + properties.name + '/vms', vmsRouter);
    app.use('/' + properties.name + '/gameNodes', gameNodesRouter);
    app.use('/' + properties.name + '/vmTemplates', vmTemplatesRouter);
    app.use('/' + properties.name + '/gpuTemplates', gpuTemplatesRouter);
};

// Expose this as a singleton
module.exports = DCM;
