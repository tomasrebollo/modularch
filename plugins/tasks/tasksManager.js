/**
 * Created by trebollo on 5/2/16.
 */

var _       = require('lodash');
var async   = require('async');
var common  = require('./models/common');
var Task    = require('./models/task');


/**
 * Manages everything related to tasks and their executions.
 * @constructor
 */
function TaskManager() {
    this.tasks = [];
    this.maxTasks = 50;
}

/**
 * Retrieves all tasks.
 * @returns {Array}
 */
TaskManager.prototype.getTasks = function () {
    return this.tasks;
}

/**
 * Retrieves a task by its identifier.
 * @param id
 * @returns {*}
 */
TaskManager.prototype.getTask = function (id) {
    return _.find(this.tasks, {'id': id});
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
    task.description = 'This is a test description of the task';
    task.taskCallback = taskFn;
    task.doneCallback = doneFn;
    this.tasks.push(task);
    return task;
};

/**
 * Removes an exiting task identified by its id.
 * @param id
 * @returns {Array}
 */
TaskManager.prototype.remove = function (id) {
    return _.remove(this.tasks, {'id': id});
};

/**
 * Create a new task to be executed immediately, whenever is possible.
 * @param callback      The task function itself, where the logic of the task resides.
 * @param doneCallback  A function to be executed when tasks is done.
 * @param name          Optional a name can be given to the task.
 * @returns {Task|exports|module.exports}
 */
TaskManager.prototype.execute = function (id) {
    var task = _.find(this.tasks, {'id': id});
    if (task) {
        if (typeof task.taskCallback === 'function') {

            // Initializes task properties before execution
            task.progress = 0;
            task.state = common.taskStates.executing;

            // Execute the task function
            task.taskCallback();

            // Update task properties once completed
            task.lastExecuted = new Date();
            task.progress = Math.round(Math.random() * 80) + 20;
            task.state = common.taskStates.finished;

            // If defined, execute the 'done' callback function
            if (typeof task.doneCallback === 'function') {
                task.doneCallback();
            }
        }
    }
    return task;
};

// Expose this as a singleton
module.exports = new TaskManager();
