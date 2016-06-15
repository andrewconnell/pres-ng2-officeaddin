/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/app.d.ts" />
/// <reference path="../../tools/typings/custom.d.ts" />
(function () {
    'use strict';
    // create the angular app
    var app = angular.module('outlookApp', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngMaterial'
    ]);
    // configure the app
    app.config([
        '$logProvider',
        '$routeProvider',
        '$mdThemingProvider',
        function ($logProvider, $routeProvider, $mdThemingProvider) {
            // set debug logging to on
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
            // setup routing
            outlookApp.Routes.configure($routeProvider);
            // configure theme color
            $mdThemingProvider.theme('default').primaryPalette('blue');
        }
    ]);
    // when office has initialized, manually bootstrap the app
    Office.initialize = function () {
        angular.bootstrap(jQuery('#container'), ['outlookApp']);
    };
})();

//# sourceMappingURL=app.module.js.map