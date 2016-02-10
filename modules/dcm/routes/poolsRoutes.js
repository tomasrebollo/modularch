/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// Pools resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getPools());
});

router.get('/:handler', function(req, res) {
    res.send(dataModel.getPool(req.params.handler));
});

router.delete('/:handler', function(req, res) {
    res.send(dataModel.removePool(req.params.handler));
});

module.exports = router;
