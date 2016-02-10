/**
 * Created by trebollo on 6/2/16.
 */

var _ = require('lodash');

/**
 * Encapsulates and manages the data model of the DCM.
 * @constructor
 */
function DataModel () {
    this.address = null;
    this.port = null;
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
 * Retrieves all the VMs.
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

/**
 * Retrieves all the Game Nodes.
 * @returns {Array}
 */
DataModel.prototype.getGameNodes = function() {
    return _.chain(this.gameNodes);
};

/**
 * Retrieves a Game Node by its token.
 * @param token   The unique identifier of Game Node session.
 * @returns {*}
 */
DataModel.prototype.getGameNode = function (token) {
    return _.find(this.gameNodes, {'token': token});
};

/**
 * Removes a Game Node identified by its token.
 * @param token   The unique identifier of Game Node session.
 * @returns {*}
 */
DataModel.prototype.removeGameNode = function (token) {
    return _.remove(this.gameNodes, {'token': token});
};

/**
 * Retrieves all the VM Templates.
 * @returns {Array}
 */
DataModel.prototype.getVMTemplates = function() {
    return _.chain(this.vmTemplates);
};

/**
 * Retrieves a VM Template by its name.
 * @param name   The unique identifier of VM Template.
 * @returns {*}
 */
DataModel.prototype.getVMTemplate = function (name) {
    return _.find(this.vmTemplates, {'name': name});
};

/**
 * Removes a VM Template identified by its name.
 * @param name   The unique identifier of VM Template.
 * @returns {*}
 */
DataModel.prototype.removeVMTemplate = function (name) {
    return _.remove(this.vmTemplates, {'name': name});
};
/**
 * Retrieves all the GPU Templates.
 * @returns {Array}
 */
DataModel.prototype.getGPUTemplates = function() {
    return _.chain(this.gpuTemplates);
};

/**
 * Retrieves a GPU Template by its name.
 * @param model   The unique identifier of GPU Template.
 * @returns {*}
 */
DataModel.prototype.getGPUTemplate = function (model) {
    return _.find(this.gpuTemplates, {'name': model});
};

/**
 * Removes a GPU Template identified by its name.
 * @param model   The unique identifier of GPU Template.
 * @returns {*}
 */
DataModel.prototype.removeGPUTemplate = function (model) {
    return _.remove(this.gpuTemplates, {'model': model});
};

// Export it as a singleton
module.exports = DataModel;
