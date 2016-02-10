/**
 * Created by trebollo on 6/2/16.
 */

var express = require('express');
var router = express.Router();

// Check auth on every resource
router.get('/', function(req, res, next) {
    res.sendFile('index.html');
});

module.exports = router;
