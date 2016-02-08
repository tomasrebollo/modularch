/**
 * Created by trebollo on 6/2/16.
 */

var pluginName = 'tasks';
var pluginBaseUrl = '/' + pluginName;

//angular.module(pluginName, ['ui.router'])
angular.module('modularch')

    .config(function($stateProvider) {

        // Now set up the states
        $stateProvider
            .state(pluginName, {
                url: pluginBaseUrl,
                templateUrl: pluginBaseUrl + '/public/views/index.html',
                controller: 'tasks.mainCtrl',
                resolve: {
                    loadTasks: function (TasksStore) {
                        return TasksStore.loadTasks();
                    }
                }
            });
    });