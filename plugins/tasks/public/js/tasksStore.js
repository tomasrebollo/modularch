/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.tasks')

    .service('TasksStore', function ($http, EventManager, CommonDispatcher) {

        var tasks = [];
        var eventManager = new EventManager();

        /**
         * Registers a listener that will be notified whenever given event raises.
         * @param event     The event the listener wants to be subscribed to.
         * @param callback  A function to be executed whenever the event raises.
         */
        this.register = function (event, callback) {
            eventManager.register(event, callback);
        };

        /**
         * Load the tasks from server.
         * @param callback  Optional callback function to be called when done.
         */
        this.loadTasks = function (callback) {
            $http.get('/tasks/tasks').then(
                function (res) {
                    tasks = res.data;
                    doCallback(callback, tasks);
                }, function (err) {
                    doCallback(callback, null);
                });
        };

        /**
         * Retrieves all the existing tasks.
         * @returns {pg.tasks|Array|*}
         */
        this.getTasks = function () {
            return tasks;
        };

        /**
         * Creates a new random task.
         */
        this.createNewTask = function (name) {
            var self = this;
            var name = name ? name : ('task-' + (Math.round(Math.random() * 100)));
            $http.post('/tasks/tasks/' + name, null)
                .then(function (res) {
                        self.loadTasks(function () {
                            eventManager.emit('TASK_ADDED');
                        });
                    }
                );
        };

        /**
         * Executes a given task.
         * @param task  The task to execute.
         */
        this.executeTask = function (task) {
            var self = this;
            $http.put('/tasks/tasks/' + task.id + '/execute', null)
                .then(function (res) {
                    self.loadTasks(function () {
                        eventManager.emit('TASK_UPDATED');
                    });
                });
        };

        /**
         * Removes the given task.
         * @param task  The task to remove.
         */
        this.removeTask = function (task) {
            var self = this;
            $http.delete('/tasks/tasks/' + task.id)
                .then(function (res) {
                    self.loadTasks(function () {
                        eventManager.emit('TASK_REMOVED');
                    });
                });
        };

        // Register this store to selected events from the common dispatcher, just to be notified
        // whenever they occur and then take the actions in consequence. (te 'bind' if for passing
        // the correct 'this' to the function)
        CommonDispatcher.register('TASK_ADD', this.createNewTask.bind(this));
        CommonDispatcher.register('TASK_EXECUTE', this.executeTask.bind(this));
        CommonDispatcher.register('TASK_REMOVE', this.removeTask.bind(this));

    });
