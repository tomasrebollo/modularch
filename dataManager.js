/**
 * Created by trebollo on 5/2/16.
 */

var _       = require('lodash');
var path    = require('path');
var DCM     = require('dcm');

/**
 * A manager for managing all app data.
 * @constructor
 */
function DataManager () {
    this.app = null;
    this.cm = null;
    this.dcms = [];
}

/**
 * Retrieves all the DCMs.
 * @returns {Array}
 */
DataManager.prototype.getDCMs = function() {
    return this.dcms;
};

/**
 * Retrieve a DCM by its address and port.
 * @param address   The address of the DCM.
 * @param port      The port of the DCM.
 * @returns {*}     Returns the DCM if found or null if not.
 */
DataManager.prototype.getDCM = function (address, port) {
    return _.find(this.dcms, {'address': address, 'port': port});
};

/**
 * Initializes the manager and loads all plugins.
 * @param app
 */
DataManager.prototype.init = function (app) {
    this.app = app;

    // DEBUG / Create a fake DCM
    var dcm = new DCM(app);
    dcm.data.address = 'localhost';
    dcm.data.port = 8080;
    this.dcms.push(dcm.data);
    // END DEBUG
}


// Export as a singleton
module.exports = new DataManager();


