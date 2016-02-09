/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.tasks')

    .service('TasksStore', function ($http) {

        this.tasks = [];
        this.listeners = [];
        this.events = {
            TASK_ADDED:   'TASK_ADDED',
            TASK_UPDATED: 'TASK_UPDATED',
            TASK_REMOVED: 'TASK_REMOVED'
        };

        /**
         * Emits an event to all subscribed listeners.
         * @param event
         */
        this.listenTo = function (event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        };

        /**
         * Emits an event to all subscribed listeners.
         * @param event
         */
        this.emitEvent = function (event) {
            if (this.listeners[event]) {
                angular.forEach(this.listeners[event], function (callback) {
                    doCallback(callback);
                });
            }
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
        this.createNewTask = function () {
            var self = this;
            var name = 'task-' + (Math.round(Math.random() * 100));
            $http.post('/tasks/tasks/' + name, null)
                .then(function (res) {
                        self.loadTasks(function () {
                            self.emitEvent(self.events.TASK_ADDED);
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
                        self.emitEvent(self.events.TASK_UPDATED);
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
                        self.emitEvent(self.events.TASK_REMOVED);
                    });
                });
        };

    });
