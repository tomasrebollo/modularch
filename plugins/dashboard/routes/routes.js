/**
 * Created by trebollo on 6/2/16.
 */

var path        = require('path');
var express     = require('express');
var DCM         = require('dcm');
var properties  = require('../package.json');
var common      = require('../models/common');

var router = express.Router();

// Retrieve the index file
router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
});

router.get('/about', function(req, res) {
    res.send(properties);
});

router.get('/dcms', function(req, res) {
    res.send(common.dcms);
});

router.post('/test', function(req, res) {
    // Create a Fake DCM to test
    var dcm = new DCM(common.app);
    dcm.data.address = req.body.address;
    dcm.data.port = req.body.port;

    common.dcms.push(dcm.data);

    res.sendStatus(200);
});


module.exports = router;
