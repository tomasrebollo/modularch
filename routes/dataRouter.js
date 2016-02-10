/**
 * Created by trebollo on 6/2/16.
 */

var _           = require('lodash');
var express     = require('express');
var dataManager = require('../dataManager');

var router = express.Router();

// Test
router.get('/', function(req, res) {
    res.sendStatus(200);
});

router.get('/dcms', function(req, res) {
    res.send(dataManager.getDCMs());
});

router.get('/dcms/:address/:port', function(req, res) {
    res.send(dataManager.getDCM(req.params.address, req.params.port));
});

module.exports = router;
