/**
 * Created by trebollo on 5/2/16.
 */

function Plugin (def, dir) {
    // Extract some useful attributes form package definition
    this.name = def.name;
    this.version = def.version;
    this.description = def.description;

    // Load the plugin and set a reference to its router handler
    this.app = require(dir);
    this.app.init();

    this.router = this.app.router;
}

module.exports = Plugin;