/**
 * Created by trebollo on 6/2/16.
 */

var common = require('./common');

/**
 * Represents a single Game Node object modeled as DCM does.
 * @constructor
 */
function GameNode () {
    this.handler = null;
    this.token = null;
    this.user = null;
    this.game = null;
}

module.exports = GameNode;
