/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.dcm')

    .service('DCMStore', function ($http, EventManager, CommonDispatcher) {

        this.pools = [];
        this.hosts = [];
        this.vms = [];
        this.gameNodes = [];
        this.vmTemplates = [];
        this.gpuTemplates = [];

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
         * Retrieves all the Pools.
         * @returns {Array|*}
         */
        this.getPools = function() {
            return this.pools;
        };

        /**
         * Retrieves all the Hosts.
         * @returns {Array|*}
         */
        this.getHosts = function() {
            return this.hosts;
        };

        /**
         * Retrieves all the VMs.
         * @returns {Array|*}
         */
        this.getVMs = function() {
            return this.vms;
        };

        /**
         * Retrieves all the Game Nodes.
         * @returns {Array|*}
         */
        this.getGameNodes = function() {
            return this.gameNodes;
        };

        /**
         * Retrieves all the VM Templates.
         * @returns {Array|*}
         */
        this.getVMTemplates = function() {
            return this.vmTemplates;
        };

        /**
         * Retrieves all the GPU Templates.
         * @returns {Array|*}
         */
        this.getGPUtemplates = function() {
            return this.gpuTemplates;
        };

        // Register this store to selected events from the common dispatcher, just to be notified
        // whenever they occur and then take the actions in consequence. (The 'bind' is for passing
        // the correct 'this' to the function)
        CommonDispatcher.register('POOL_ADDED', this.getPlugin.bind(this));
        // TODO
    });