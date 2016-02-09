/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.tasks')

    .service('TasksStore', function ($http, EventManager) {

        this.tasks = [];
        this.eventManager = new EventManager();

        /**
         * Registers a listener that will be notified whenever given event raises.
         * @param event     The event the listener wants to be subscribed to.
         * @param callback  A function to be executed whenever the event raises.
         */
        this.register = function (event, callback) {
            this.eventManager.register(event, callback);
        };

        /**
         * Load the tasks from server.
         * @param callback
         */
        this.loadTasks = function (callback) {
            var self = this;
            $http.get('/tasks/tasks').then(
                function (res) {
                    self.tasks = res.data;
                    doCallback(callback, true);
                }, function (err) {
                    doCallback(callback, false);
                });
        };

        /**
         * Retrieves all the existing tasks.
         * @returns {pg.tasks|Array|*}
         */
        this.getTasks = function () {
            return this.tasks;
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
                            self.eventManager.emit('TASK_ADDED');
                        });
                    }
                );
        };

        /**
         * Executres a given task.
         * @param task
         */
        this.executeTask = function (task) {
            var self = this;
            $http.post('/tasks/tasks/' + task.id + '/execute', null)
                .then(function (res) {
                    self.loadTasks(function () {
                        self.eventManager.emit('TASK_UPDATED');
                    });
                });
        };

        /**
         * Executres a given task.
         * @param task
         */
        this.removeTask = function (task) {
            var self = this;
            $http.delete('/tasks/tasks/' + task.id)
                .then(function (res) {
                    self.loadTasks(function () {
                        self.eventManager.emit('TASK_REMOVED');
                    });
                });
        };

    });
