/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// VMs resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getVMs());
});

router.get('/:handler', function(req, res) {
    res.send(dataModel.getVM(req.params.handler));
});

router.delete('/:handler', function(req, res) {
    res.send(dataModel.removeVM(req.params.handler));
});

module.exports = router;
