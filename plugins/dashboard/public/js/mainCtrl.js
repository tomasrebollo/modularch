/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.dashboard')

    .controller('pg.dashboard.mainCtrl', function ($http, $scope, TasksActions) {

        $scope.pluginName = 'Dashboard Plugin';
        $scope.dcms = [];

        /**
         * Adds a task through TasksStore.
         * @param name  The name of the task
         */
        $scope.addTask = function (name) {
            TasksActions.createTask(name);
        };

        /**
         * Test function.
         * @param address
         * @param port
         */
        $scope.getDCMs = function () {
            $http.get('/dashboard/dcms')
                .then(function (res) {
                    $scope.dcms = res.data;
                });
        }

        /**
         * Test function.
         * @param address
         * @param port
         */
        $scope.addDCM = function (address, port) {
            var body = {
                address: address,
                port: port
            };
            $http.post('/dashboard/test' + name, body)
                .then(function (res) {
                    $scope.getDCMs();
                });
        }
    });