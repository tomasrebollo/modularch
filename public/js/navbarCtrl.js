/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.imt')

    .controller('navbarCtrl', function ($scope, PluginsStore) {

        // Holds all possible views that are accessible from top navigation bar
        $scope.views = [];

        // Always adds as first view the 'Home'
        $scope.views.push({name: 'Home', state: 'home'});

        // Load plugins to configure the views
        PluginsStore.loadPlugins(function (plugins) {
            if (plugins) {
                _.forEach(plugins, function (plugin) {
                    $scope.views.push({name: _.capitalize(plugin.name), state: plugin.name});
                });
            }
        });
    });