/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.common')

    .service('PluginsStore', function ($http, EventManager, CommonDispatcher) {

        this.plugins = [];
        this.eventManager = new EventManager();

        /**
         * Registers a listener that will be notified whenever given event raises.
         * @param event     The event the listener wants to be subscribed to.
         * @param callback  A function to be executed whenever the event raises.
         */
        this.register = function (event, callback) {
            this.eventManager.register(event, callback);
        };

        /**
         * Retrieves all the existing plugins.
         * @returns {Array|*}
         */
        this.getPlugins = function() {
            return this.plugins;
        };

        /**
         * Load the plugins from server.
         * @param callback  A callback function that will be called with an array of plugins.
         */
        this.loadPlugins = function (callback) {
            var self = this;
            $http.get('/plugins').then(
                function (res) {
                    self.plugins = res.data;
                    async.map(res.data,
                        function (plugin, doneCallback) {
                            // Retrieve each plugin information
                            $http.get('/' + plugin.name + '/about')
                                .then(function (aboutResponse) {
                                    plugin.defs = aboutResponse.data.plugin;
                                    doneCallback(null, plugin.defs);
                                }, function (err) {
                                    doneCallback(new Error('Impossible to get information about plugin \'' + plugin.name + '\''));
                                });
                        },
                        function (err, results) {
                            if (!err) {
                                doCallback(callback, self.plugins);
                            } else {
                                console.log(err.message);
                                doCallback(callback, null);
                            }
                        });
                }, function (err) {
                    doCallback(callback, null);
                });
        };

        // Register this store to selected events from the common dispatcher, just to be notified
        // whenever they occur and then take the actions in consequence. (The 'bind' is for passing
        // the correct 'this' to the function)
        CommonDispatcher.register('PLUGIN_ADDED', this.loadPlugins.bind(this));

    });