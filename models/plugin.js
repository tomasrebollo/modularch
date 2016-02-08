/**
 * Created by trebollo on 5/2/16.
 */

function Plugin (def, dir) {
    // Extract some useful attributes form package definition
    this.name = def.name;
    this.version = def.version;
    this.description = def.description;

    // Load the plugin and set a reference to its router handler
    this.module = require(dir);
    //this.router = this.module.router;
}

/**
 * Initializes the plugin module, passing a reference to the main App.
 * @param app
 */
Plugin.prototype.init = function (app) {
    this.module.init(app);
};

module.exports = Plugin;