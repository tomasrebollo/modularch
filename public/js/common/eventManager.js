/**
 * Created by tomas.rebollo on 09/02/2016.
 */

angular.module('pg.common')

    .factory('EventManager', function () {

        /**
         * Represents an event manager.
         * @constructor
         */
        function EventManager() {
            this.listeners = [];
        }

        /**
         * Retrieves all the registered listeners. If a specific event is given,
         * then returns only an array of listeners registered to that event.
         * @param event         Optional paramter that allows to retrieve only listeners registered
         *                      to a specific event. If no defined, returns all the listeners.
         * @returns {Array}     An array containing all the registered listener.
         */
        EventManager.prototype.getListeners = function (event) {
            var listeners = [];
            if (event) {
                listeners = _.find(this.listeners, {'event': event});
            } else {
                listeners = _.chain(this.listeners);
            }
            return listeners;
        };

        /**
         * Registers or subscribes a listener to a specific event.
         * @param event         The event the listener wants to subscribe to.
         * @param callback      A callback function to be executed whenever event raises.
         */
        EventManager.prototype.register = function (event, callback) {
            // If there is no previous listener subscribed to given event, create the entry
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            // Register the listener inside the event's array of callbacks
            this.listeners[event].push(callback);
        };

        /**
         * Removes or cancel subscription of a listener to a specific event.
         * @param event         The event the listener wants to unregistered from.
         * @param callback      A callback function to be executed whenever event raises.
         */
        EventManager.prototype.unregister = function (event, callback) {
            _.remove(this.listeners, {'event': event, 'callback': callback});
        };

        /**
         * Emits an event to all ist registered listeners. What this does is execute each
         * listener's callback function with all variable arguments passed to this function.
         * @param event     The event to be emitted.
         */
        EventManager.prototype.emit = function (event) {
            if (this.listeners[event]) {
                // Retrieve all arguments passed to this function (get rid of the first, because is the event)
                var args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);

                _.forEach(this.listeners[event], function (callback) {
                    // Prepend the listener callback to be the first argument
                    args.unshift(callback);
                    // Apply the callback function with passed arguments
                    doCallback.apply(null, args);
                });
            }
        };

        return EventManager;
    });