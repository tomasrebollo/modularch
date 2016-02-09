/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.common')

    .service('PluginsStore', function ($http) {

        this.plugins = [];
        this.listeners = [];
        this.events = {
            TEST: 'TEST'
        };

        /**
         * Emits an event to all subscribed listeners.
         * @param event
         */
        this.listenTo = function (event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        };

        /**
         * Emits an event to all subscribed listeners.
         * @param event
         */
        this.emitEvent = function (event) {
            if (this.listeners[event]) {
                angular.forEach(this.listeners[event], function (callback) {
                    doCallback(callback);
                });
            }
        };

        /**
         * Retrieves all the existing plugins.
         * @returns {Array|*}
         */
        this.getPlugins = function() {
            return this.plugins;
        }

        /**
         * Load the plugins from server.
         * @param callback
         */
        this.loadPlugins = function (callback) {
            var self = this;
            $http.get('/plugins').then(
                function (res) {
                    self.plugins = res.data;
                    async.map(self.plugins,
                        function (plugin, doneCallback) {
                            $http.get('/' + plugin.name + '/about')
                                .then(function (aboutResponse) {
                                    plugin.defs = aboutResponse.data.plugin;
                                    doneCallback(null, aboutResponse.data);
                                }, function (err) {
                                    doneCallback(new Error('Impossible to get information about plugin \'' + plugin.name + '\''));
                                });
                        },
                        function (err, results) {
                            if (!err) {
                                doCallback(callback, self.plugins);
                            } else {
                                console.log(err.message);
                                doCallback(callback, []);
                            }
                        });
                }, function (err) {
                    doCallback(callback, []);
                });
        };

    });