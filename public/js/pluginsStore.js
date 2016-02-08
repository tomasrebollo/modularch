/**
 * Created by trebollo on 7/2/16.
 */

angular.module('modularch')

    .service('PluginsStore', function ($http) {

        this.plugins = [];

        // Load the plugins from server
        this.loadPlugins = function (callback) {
            var self = this;
            $http.get('/plugins').then(
                function (res) {
                    self.plugins = res.data;
                    callback(true);
                }, function (err) {
                    callback(false);
                });
        };

    });