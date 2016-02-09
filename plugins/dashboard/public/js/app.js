/**
 * Created by trebollo on 6/2/16.
 */

//angular.module('pg.imt')
angular.module('pg.dashboard', ['ui.router', 'pg.common', 'pg.tasks'])

    .config(function($stateProvider, $urlRouterProvider) {

        var pluginName = 'dashboard';
        var pluginBaseUrl = '/' + pluginName;

        // For any unmatched url, redirect to base url. This will be satisfied when
        // the app is launched as a stand alone , instead of a plugin app.
        $urlRouterProvider.when('', pluginBaseUrl);

        // Now set up the states
        $stateProvider
            .state(pluginName, {
                url: pluginBaseUrl,
                views: {
                    '@': {
                        templateUrl: pluginBaseUrl + '/public/views/home.html',
                        controller: 'pg.dashboard.mainCtrl'
                    }
                }
            });
    });