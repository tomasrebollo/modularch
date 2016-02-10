/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.dashboard')

    .controller('pg.dashboard.mainCtrl', function ($scope, TasksActions) {

        $scope.pluginName = 'Dashboard Plugin';

        /**
         * Adds a task through TasksStore.
         * @param name  The name of the task
         */
        $scope.addTask = function (name) {
            TasksActions.createTask(name);
        };
    });