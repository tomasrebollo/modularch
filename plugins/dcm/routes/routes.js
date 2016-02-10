/**
 * Created by trebollo on 6/2/16.
 */

var express     = require('express');
var properties  = require('../package.json');

var router = express.Router();

// Retrieve this plugin information
router.get('/about', function(req, res) {
    res.send(properties);
});

module.exports = router;
