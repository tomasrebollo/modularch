/**
 * Created by trebollo on 6/2/16.
 */

var express     = require('express');
var taskManager = require('../taskManager');

var router = express.Router();

// Retrieve the index file
router.get('/', function(req, res) {
    res.send('Hello from TaskApp plugin');
});

// Tasks resources
router.get('/tasks', function(req, res) {
    res.send(taskManager.tasks);
});

router.get('/tasks/:name', function(req, res) {
    var task = taskManager.create(req.params.name,
        function () {
            console.log('Executing task ' + this.name + ' crated on ' + this.created.toISOString() +
                        ((this.lastExecuted) ? ' and last executed on ' + this.lastExecuted.toISOString() : ''));
        }, function () {
            console.log('Finished executing task ' + this.name);
        });

    res.send(task);
});

router.get('/tasks/:name/execute', function(req, res) {
    if (taskManager.execute(req.params.name)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;
