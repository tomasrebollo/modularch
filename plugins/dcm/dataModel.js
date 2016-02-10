/**
 * Created by trebollo on 6/2/16.
 */

var _ = require('lodash');

/**
 * Encapsulates and manages the data model of the DCM.
 * @constructor
 */
function DataModel () {
    this.pools = [];
    this.hosts = [];
    this.vms = [];
    this.gameNodes = [];
    this.vmTemplates = [];
    this.gpuTemplates = [];
}

/**
 * Retrieves all the Pools.
 * @returns {Array}
 */
DataModel.prototype.getPools = function() {
    return _.chain(this.pools);
};

/**
 * Retrieves a Pool by its handler.
 * @param handler   The unique identifier of the Pool.
 * @returns {*}
 */
DataModel.prototype.getPool = function (handler) {
    return _.find(this.pools, {'handler': handler});
};

/**
 * Removes a Pool identified by its handler.
 * @param handler   The unique identifier of the Pool.
 * @returns {*}
 */
DataModel.prototype.removePool = function (handler) {
    return _.remove(this.pools, {'handler': handler});
};

/**
 * Retrieves all the Hosts.
 * @returns {Array}
 */
DataModel.prototype.getHosts = function() {
    return _.chain(this.hosts);
};

/**
 * Retrieves a Host by its handler.
 * @param handler   The unique identifier of the Host.
 * @returns {*}
 */
DataModel.prototype.getHost = function (handler) {
    return _.find(this.hosts, {'handler': handler});
};

/**
 * Removes a Host identified by its handler.
 * @param handler   The unique identifier of the Host.
 * @returns {*}
 */
DataModel.prototype.removeHost = function (handler) {
    return _.remove(this.hosts, {'handler': handler});
};

/**
 * Retrieves all the VM.
 * @returns {Array}
 */
DataModel.prototype.getVMs = function() {
    return _.chain(this.vms);
};

/**
 * Retrieves a VM by its handler.
 * @param handler   The unique identifier of the VM.
 * @returns {*}
 */
DataModel.prototype.getVM = function (handler) {
    return _.find(this.vms, {'handler': handler});
};

/**
 * Removes a VM identified by its handler.
 * @param handler   The unique identifier of the VM.
 * @returns {*}
 */
DataModel.prototype.removeVM = function (handler) {
    return _.remove(this.vms, {'handler': handler});
};

// Export it as a singleton
module.exports = new DataModel();
