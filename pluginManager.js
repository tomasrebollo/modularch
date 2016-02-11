/**
 * Created by trebollo on 5/2/16.
 */

var _           = require('lodash');
var fs          = require('fs');
var path        = require('path');
var express     = require('express');
var properties  = require('./package.json');
var dataManager = require('./dataManager');
var Plugin      = require('./models/plugin');

/**
 * A manager for controlling all plugins.
 * @constructor
 */
function PluginManager () {
    this.app = null;
    this.plugins = [];
    this.folder = path.resolve(__dirname, properties.plugins);
}

/**
 * Retrieves all the plugins.
 * @returns {Array}
 */
PluginManager.prototype.getPlugins = function() {
    return this.plugins;
};

/**
 * Retrieve a plugin by its name.
 * @param name  The name of the plugin.
 * @returns {*} The plugin that matches given name or null if it does not exists.
 */
PluginManager.prototype.getPlugin = function (name) {
    return _.find(this.plugins, {'name': name});
};

/**
 * Initializes the manager and loads all plugins.
 * @param app
 */
PluginManager.prototype.init = function (app) {
    this.app = app;
    this.loadPlugins();
}

/**
 * Search inside plugins folder and register each plugin found.
 * This must be a sync function because on each plugin found, it
 * will be registered and its router endpoints will be set.
 */
PluginManager.prototype.loadPlugins = function() {
    var self = this;
    if (this.folder) {
        //console.log('Loading plugins from ' + this.folder + ' ...');
        var files = fs.readdirSync(this.folder);
        _.forEach(files, function (file) {
            var pluginDir = path.resolve(self.folder, file);
            var stat = fs.statSync(pluginDir);
            if (stat.isDirectory()) {
                var packageFile = path.resolve(pluginDir, 'package.json');
                if (fs.existsSync(packageFile)) {
                    var data = fs.readFileSync(packageFile);
                    var pluginDef = JSON.parse(data);
                    self.register(pluginDef, pluginDir);
                }
            }
        });

        // Once all plugins has been loaded, resolve their dependencies and initialize them
        this.resolveDependencies();

    } else {
        console.log('Error: Plugins folder has not been configured');
    }
};

/**
 * Adds a new plugin to this manager.
 * @param pluginDef    The plugin's package.json module definition.
 */
PluginManager.prototype.register = function (pluginDef, pluginDir) {
    this.plugins.push(new Plugin(pluginDef, pluginDir));
};

/**
 * Adds a new plugin to this manager.
 * @param pluginDef    The plugin's package.json module definition.
 */
PluginManager.prototype.resolveDependencies = function () {
    var self = this;

    // For each module or plugin check if all its dependencies on other modules can be resolved
    _.forEach(this.plugins, function (plugin) {
        //console.log('Resolving dependencies of plugin ' + plugin.name + ' ...');
        var resolved = true;
        var dependencies = plugin.properties.consumes;

        // Always add the dataManager as a provider
        var providers = {
            DataManager: dataManager
        };

        // A plugin can have no dependencies on other plugins, so check it first
        if (!_.isEmpty(dependencies)) {
            _.forEach(dependencies, function (providerName, pluginName) {
                // First get the right plugin, if exists
                var pluginDep = _.find(self.plugins, {'name': pluginName});
                if (pluginDep) {
                    // Then retrieve the provider by its name, if exists
                    var provider = pluginDep.module.providers[providerName];
                    if (provider) {
                        providers[providerName] = provider;
                    } else {
                        resolved = false;
                        console.log('Error: The plugin ' + pluginName + ' does not provide ' + providerName +
                                    ', which is required by the plugin ' + plugin.name);
                    }
                } else {
                    resolved = false;
                    console.log('Error: The plugin ' + pluginName + ' does not exists and its ' + providerName +
                                ' provider is required by the plugin ' + plugin.name);
                }
            });
        }

        // If plugin dependencies has been successfully resolved, initialize the plugin
        if (resolved) {
            plugin.init(self.app, providers);
        }
    });
};


// Export as a singleton
module.exports = new PluginManager();


