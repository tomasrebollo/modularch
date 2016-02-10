/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.tasks')

    .controller('pg.tasks.mainCtrl', function ($scope, TasksStore, TasksActions, PluginsStore) {

        $scope.pluginName = 'Tasks Plugin';
        $scope.tasks = TasksStore.getTasks();
        $scope.plugins = PluginsStore.getPlugins();

        // Context menu options for tasks
        $scope.taskMenuOptions = function (task) {
            return [
                ['Execute', function ($itemScope) { $scope.executeTask($itemScope.task); }],
                ['Dismiss', function ($itemScope) { $scope.removeTask($itemScope.task); }]
            ];
        };

        /**
         * Retrieves the tasks form the TasksStore.
         */
        $scope.getTasks = function () {
            $scope.tasks = TasksStore.getTasks();
        };

        /**
         * Creates a new random task.
         */
        $scope.createTask = function () {
            TasksActions.createTask();
        };

        /**
         * Executes a given task.
         * @param task
         */
        $scope.executeTask = function (task) {
            TasksActions.executeTask(task);
        };

        /**
         * Removes a given task.
         * @param task
         */
        $scope.removeTask = function (task) {
            TasksActions.removeTask(task);
        };

        // Subscribe to TaskStore events
        TasksStore.register('TASK_ADDED',   function () { $scope.getTasks(); });
        TasksStore.register('TASK_UPDATED', function () { $scope.getTasks(); });
        TasksStore.register('TASK_REMOVED', function () { $scope.getTasks(); });
    });