/**
 * Created by trebollo on 5/2/16.
 */

function Plugin (def, dir) {
    // Extract some useful attributes form package definition
    this.name = def.name;
    this.version = def.version;
    this.description = def.description;
    this.properties = def.plugin;

    // Load the plugin and set a reference to its router han
    var module = require(dir);
    this.module = new module();
}

/**
 * Initializes the plugin module, passing a reference to the main App.
 * @param app
 */
Plugin.prototype.init = function (app, consumers) {
    this.module.init(app, consumers);
};

module.exports = Plugin;