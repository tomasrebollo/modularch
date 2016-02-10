/**
 * Created by trebollo on 6/2/16.
 */

var express   = require('express');
var dataModel = require('../dataModel');

var router = express.Router();

// GPU Templates resources endpoints
router.get('/', function(req, res) {
    res.send(dataModel.getGPUTemplates());
});

router.get('/:model', function(req, res) {
    res.send(dataModel.getGPUTemplate(req.params.model));
});

router.delete('/:model', function(req, res) {
    res.send(dataModel.removeGPUTemplate(req.params.model));
});

module.exports = router;
