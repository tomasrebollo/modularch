/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// Hosts resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getHosts());
});

router.get('/:handler', function(req, res) {
    res.send(dataModel.getHost(req.params.handler));
});

router.delete('/:handler', function(req, res) {
    res.send(dataModel.removeHost(req.params.handler));
});

module.exports = router;
