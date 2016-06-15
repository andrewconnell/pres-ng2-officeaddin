/// <reference path="../../tools/typings/tsd.d.ts" />
/// <reference path="../../tools/typings/app.d.ts" />
var outlookApp;
(function (outlookApp) {
    'use strict';
    var Routes = (function () {
        function Routes() {
        }
        Routes.configure = function ($routeProvider) {
            var viewBase = 'app/';
            $routeProvider.when('/', {
                templateUrl: viewBase + 'customers/customers.html',
                controller: 'outlookApp.customers.customersController',
                controllerAs: 'vm'
            }).when('/:customerID', {
                templateUrl: viewBase + 'customers/customers-detail.html',
                controller: 'outlookApp.customers.customersDetailController',
                controllerAs: 'vm'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        };
        return Routes;
    })();
    outlookApp.Routes = Routes;
})(outlookApp || (outlookApp = {}));

//# sourceMappingURL=app.routes.js.map