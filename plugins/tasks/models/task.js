/**
 * Created by trebollo on 6/2/16.
 */

var uuid   = require('node-uuid');
var common = require('./common');

/**
 * Represents a single task.
 * @constructor
 */
function Task (name) {
    this.id = uuid.v4();
    this.name = name;
    this.state = common.taskStates.stopped;
    this.progress = 0;
    this.created = new Date();
    this.lastExecuted = null;
    this.taskCallback = null;
    this.doneCallback = null;
}

module.exports = Task;
