/**
 * Created by tomas.rebollo on 09/02/2016.
 */

angular.module('pg.common')

    .service('CommonDispatcher', function () {

        this.listeners = [];

        /**
         * Registers a new listener to a specific event. Listeners are registered
         * in a map where the key is the event. For each event there is an array
         * containing all listener callback.
         * @param event     The event the listener will be subscribed to.
         * @param callback  A function to be executed whenever the event raises.
         */
        this.register = function (event, callback) {
            if (!_.includes(this.listeners, {'event': event})) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
        };

        /**
         *
         * @param event
         * @param callback
         */
        this.dispatch = function (event) {
            // Get all the possible arguments passed to this function (except first argument which is the event)
            var args = Array.prototype.slice.call(arguments).splice(0, 1);
            console.log(args);
            _.map(this.listeners[event], function (callback) {
                if (callback && (typeof callback === 'function')) {
                    callback.apply(null, args);
                }
            });
        };
    });