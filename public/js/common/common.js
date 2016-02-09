/**
 * Created by trebollo on 6/2/16.
 */

angular.module('pg.common', []);


//////////////////////////////////////////////////////////////////////////////////
//  HELPER FUNCTIONS - Defined globally to allow access them anywhere
//////////////////////////////////////////////////////////////////////////////////

/**
 * Executes a function passing all the variable arguments to it.
 * Performs some error checks before calling the function.
 * @param callback
 */
function doCallback (callback) {
    if (callback && (typeof callback === 'function')) {
        var args = Array.prototype.slice.call(arguments).splice(0, 1);
        callback.apply(null, args);
    }
}
