/**
 * Created by trebollo on 6/2/16.
 */

var express = require('express');
var pluginManager = require('../pluginManager');

var router = express.Router();

// Check auth on every resource
router.get('/', function(req, res, next) {
    res.send(pluginManager.getPlugins());
});

module.exports = router;
