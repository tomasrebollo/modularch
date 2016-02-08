/**
 * Created by trebollo on 7/2/16.
 */

//angular.module('tasks')
angular.module('modularch')

    .controller('tasks.mainCtrl', function ($scope, TasksStore) {

        $scope.pluginName = 'Tasks Plugin';
        $scope.tasks = TasksStore.tasks;

        /**
         * Creates a new random task
         */
        $scope.getTasks = function () {
            $scope.tasks = TasksStore.tasks;
        };

        /**
         * Creates a new random task
         */
        $scope.createNewTask = function () {
            TasksStore.createNewTask();
        };

        /**
         * Executes a given task.
         * @param task
         */
        $scope.executeTask = function (task) {
            TasksStore.executeTask(task);
        };

        /**
         * Removes a given task.
         * @param task
         */
        $scope.removeTask = function (task) {
            TasksStore.removeTask(task);
        };


        // Subscribe to TaskStore events
        TasksStore.listenTo(TasksStore.events.TASK_ADDED,   function () { $scope.getTasks(); });
        TasksStore.listenTo(TasksStore.events.TASK_UPDATED, function () { $scope.getTasks(); });
        TasksStore.listenTo(TasksStore.events.TASK_REMOVED, function () { $scope.getTasks(); });

    });