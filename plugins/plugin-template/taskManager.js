/**
 * Created by trebollo on 5/2/16.
 */

var _       = require('lodash');
var async   = require('async');
var Task    = require('./models/task');


/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function TaskManager() {
    this.tasks = [];
}

/**
 * Crates a new task.
 * @param name
 * @param taskFn
 * @param doneFn
 * @returns {Task|exports|module.exports}
 */
TaskManager.prototype.create = function (name, taskFn, doneFn) {
    var task = new Task(name);
    task.taskCallback = taskFn;
    task.doneCallback = doneFn;
    this.tasks.push(task);
    return task;
};

/**
 * Create a new task to be executed immediately, whenever is possible.
 * @param callback      The task function itself, where the logic of the task resides.
 * @param doneCallback  A function to be executed when tasks is done.
 * @param name          Optional a name can be given to the task.
 * @returns {Task|exports|module.exports}
 */
TaskManager.prototype.execute = function (name) {
    var task = _.find(this.tasks, {'name': name});
    if (task) {
        if (typeof task.taskCallback === 'function') {
            task.taskCallback();
            task.lastExecuted = new Date();
            if (typeof task.doneCallback === 'function') {
                task.doneCallback();
            }
        }
    }
    return task;
};

// Expose this as a singleton
module.exports = new TaskManager();
