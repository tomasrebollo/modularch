/**
 * Created by trebollo on 6/2/16.
 */

// This file intends to be a source for placing common contents, like static or
// constants definitions, enumerates, etc.
var common = {
    // All possible task states
    taskStates: {
        stopped     : 'stopped',
        pending     : 'pending',
        executing   : 'executing',
        finished    : 'finished'
    }
};

module.exports = common;
