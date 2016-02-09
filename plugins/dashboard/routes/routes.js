/**
 * Created by trebollo on 6/2/16.
 */

var path        = require('path');
var express     = require('express');
var moduleDefs  = require('../package.json');

var router = express.Router();

// Retrieve the index file
router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
});

// Retrieve this plugin information
router.get('/about', function(req, res) {
    res.send(moduleDefs);
});


module.exports = router;
