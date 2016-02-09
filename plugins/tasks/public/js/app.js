/**
 * Created by trebollo on 6/2/16.
 */

//angular.module('pg.imt')
angular.module('pg.tasks', ['pg.common', 'ui.router'])

    .config(function($stateProvider,$urlRouterProvider) {

        var pluginName = 'tasks';
        var pluginBaseUrl = '/' + pluginName;

        // For any unmatched url, redirect to base url. This will be satisfied when
        // the app is launched as a stand alone , instead of a plugin app.
        $urlRouterProvider.when('', pluginBaseUrl);

        // Now set up the states
        $stateProvider
            .state(pluginName, {
                url: pluginBaseUrl,
                views: {
                    '@': {
                        templateUrl: pluginBaseUrl + '/public/views/home.html',
                        controller: 'pg.tasks.mainCtrl',
                        resolve: {
                            loadTasks: function (TasksStore) {
                                return TasksStore.loadTasks();
                            }
                        }
                    },
                    'testView@tasks': {
                        templateUrl: pluginBaseUrl + '/public/views/test1.html'
                    }
                }
            })
            .state(pluginName + '.test1', {
                url: '/test1',
                views: {
                    'testView@tasks': {
                        templateUrl: pluginBaseUrl + '/public/views/test1.html'
                    }
                }
            })
            .state(pluginName + '.test2', {
                url: '/test2',
                views: {
                    'testView@tasks': {
                        templateUrl: pluginBaseUrl + '/public/views/test2.html'
                    }
                }
            });
    });