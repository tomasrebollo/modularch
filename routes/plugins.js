/**
 * Created by trebollo on 6/2/16.
 */

var _             = require('lodash');
var express       = require('express');
var pluginManager = require('../pluginManager');

var router = express.Router();

// Check auth on every resource
router.get('/', function(req, res, next) {
    // Returns those plugins that are public (enabled)
    var plugins = _.filter(pluginManager.getPlugins(), function (plugin) {
        return (plugin.properties.public && plugin.properties.public.enabled);
    });

    res.send(plugins);
});

module.exports = router;
