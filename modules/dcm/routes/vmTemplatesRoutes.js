/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// VM Templates resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getVMTemplates());
});

router.get('/:name', function(req, res) {
    res.send(dataModel.getVMTemplate(req.params.name));
});

router.delete('/:name', function(req, res) {
    res.send(dataModel.removeVMTemplate(req.params.name));
});

module.exports = router;
