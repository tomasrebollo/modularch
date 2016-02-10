/**
 * Created by trebollo on 6/2/16.
 */

var express = require('express');
var router = express.Router();

// Check auth on every resource
router.get('*', function(req, res, next) {
    //console.log('Checking AUTH permissions for request ' + req.method + ' - ' + req.baseUrl);
    next();
});

module.exports = router;
