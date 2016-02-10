/**
 * Created by trebollo on 6/2/16.
 */

var path        = require('path');
var express     = require('express');
var moduleDefs  = require('../package.json');
var tasksManager = require('../tasksManager');

var router = express.Router();

// Retrieve the index file
router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
});

// Retrieve this plugin information
router.get('/about', function(req, res) {
    res.send(moduleDefs);
});

// Tasks resources
router.get('/tasks', function(req, res) {
    res.send(tasksManager.getTasks());
});

// Tasks resources
router.get('/tasks/:id', function(req, res) {
    var task = tasksManager.getTask(req.params.id);
    if (task) {
        res.send(task);
    } else {
        res.sendStatus(404);
    }
});

router.post('/tasks/:name', function(req, res) {
    var task = tasksManager.create(req.params.name,
        function () {
            console.log('Executing task ' + this.name + ' crated on ' + this.created.toLocaleString() +
                        ((this.lastExecuted) ? ' and last executed on ' + this.lastExecuted.toLocaleString() : ''));
        }, function () {
            console.log('Finished executing task ' + this.name);
        });

    res.send(task);
});

router.delete('/tasks/:id', function(req, res) {
    if (tasksManager.remove(req.params.id)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.put('/tasks/:id/execute', function(req, res) {
    if (tasksManager.execute(req.params.id)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;
