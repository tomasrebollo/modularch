/**
 * Created by tomas.rebollo on 09/02/2016.
 */

angular.module('pg.common')

    .service('CommonDispatcher', function () {

        var listeners = [];

        /**
         * Registers a new listener to a specific event. Listeners are registered
         * in a map where the key is the event. For each event there is an array
         * containing all listener callback.
         * @param event     The event the listener will be subscribed to.
         * @param callback  A function to be executed whenever the event raises.
         */
        this.register = function (event, callback) {
            if (!_.includes(listeners, {'event': event})) {
                listeners[event] = [];
            }
            listeners[event].push(callback);
        };

        /**
         *  Raises an event and dispatches it to all the registered listeners. Usually the registered
         *  listeners are the data stores. This function can be called with a variable number of arguments.
         * @param event     The event to be dispatched.
         */
        this.dispatch = function (event) {
            // Get all the possible arguments passed to this function (except first argument which is the event)
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);

            _.map(listeners[event], function (callback) {
                if (callback && (typeof callback === 'function')) {
                    callback.apply(this, args);
                }
            });
        };
    });