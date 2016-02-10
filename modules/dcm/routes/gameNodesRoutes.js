/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// Game Nodes resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getGameNodes());
});

router.get('/:token', function(req, res) {
    res.send(dataModel.getGameNode(req.params.handler));
});

router.delete('/:token', function(req, res) {
    res.send(dataModel.removeGameNode(req.params.token));
});

module.exports = router;
