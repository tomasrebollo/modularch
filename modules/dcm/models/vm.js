/**
 * Created by trebollo on 6/2/16.
 */

var uuid   = require('node-uuid');
var common = require('./common');

/**
 * Represents a single Pool object modeled as DCM does.
 * @constructor
 */
function VM () {
    this.handler = uuid.v4();
    this.name = null;
    this.address = null;
    this.port = null;
    this.state = null;
}

module.exports = VM;
