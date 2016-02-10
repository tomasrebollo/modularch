/**
 * Created by trebollo on 7/2/16.
 */

angular.module('pg.tasks')

    .service('TasksActions', function (CommonDispatcher) {

        /**
         * Creates a new random task.
         * @param name  Task name.
         */
        this.createTask = function (name) {
            CommonDispatcher.dispatch('TASK_ADD', name);
        };

        /**
         * Executres a given task.
         * @param task  The task to be executed.
         */
        this.executeTask = function (task) {
            CommonDispatcher.dispatch('TASK_EXECUTE', task);
        };

        /**
         * Executres a given task.
         * @param task  The task to be removed.
         */
        this.removeTask = function (task) {
            CommonDispatcher.dispatch('TASK_REMOVE', task);
        };

    });
