/**
 * Created by trebollo on 5/2/16.
 */

var router      = require('./routes/routes');
var taskManager = require('./taskManager');


/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function TaskApp() {
    this.router = router;
}

TaskApp.prototype.init = function() {
    console.log('Initializing plugin TaskApp ...');
}

// Expose this as a singleton
module.exports = new TaskApp();
