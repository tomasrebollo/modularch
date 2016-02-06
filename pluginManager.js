/**
 * Created by trebollo on 5/2/16.
 */

var _       = require('lodash');
var fs      = require('fs');
var path    = require('path');
var Plugin  = require('./models/plugin');
var pkgJson = require('./package.json');

/**
 * A manager for controlling all plugins.
 * @constructor
 */
function PluginManager () {
    this.app = null;
    this.plugins = [];
    this.folder = path.resolve(__dirname, pkgJson.plugins);
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
        console.log('Loading plugins from ' + this.folder + ' ...');
        var files = fs.readdirSync(this.folder);
        _.map(files, function (file) {
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
    } else {
        console.log('Error: Plugins folder has not been configured');
    }
};

/**
 * Adds a new plugin to this manager.
 * @param pluginDef    The plugin's package.json module definition.
 */
PluginManager.prototype.register = function (pluginDef, pluginDir) {

    // Create the plugin and initialize
    var plugin = new Plugin(pluginDef, pluginDir);
    this.app.use('/' + plugin.name, plugin.router);

    // Finally store the plugin
    this.plugins.push(plugin);
};


// Export as a singleton
module.exports = new PluginManager();


