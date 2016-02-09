/**
 * Created by trebollo on 6/2/16.
 */

angular.module('pg.imt', ['pg.common', 'ui.router', 'oc.lazyLoad'])

    .config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise('/home');

        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'mainCtrl',
                resolve: {
                    loadPlugins: function ($q, PluginsStore) {
                        var deferred = $q.defer();
                        PluginsStore.loadPlugins(function (res) {
                            if (res) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                            }
                        });
                        return deferred.promise;
                    },
                    loadPluginsScripts: function ($q, loadPlugins, PluginsStore, $ocLazyLoad) {
                        var deferred = $q.defer();
                        var num = PluginsStore.plugins.length;

                        // Function to be executed whenever a plugin has loaded all its scripts
                        function done (success) {
                            if (--num == 0) {
                                deferred.resolve();
                            }
                        }

                        // Lazy load the each plugin scripts
                        angular.forEach(PluginsStore.plugins, function (plugin) {
                            $ocLazyLoad.load([plugin.name + '/public/js/app.js', plugin.name + '/public/js/mainCtrl.js', plugin.name + '/public/js/tasksStore.js'])
                                .then(function() { done(true); }, function() { done(false); });
                        });

                        return deferred.promise;
                    }
                }
            });
    });