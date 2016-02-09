/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.imt')

    .controller('mainCtrl', function ($scope, PluginsStore) {
        $scope.plugins = PluginsStore.plugins;
    });