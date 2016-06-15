/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/app.d.ts" />
var outlookApp;
(function (outlookApp) {
    var services;
    (function (services) {
        var CustomerService = (function () {
            /**
             * Custom Angular service that talks to a static JSON file simulating a REST API.
             *
             * @param $q                Angular's $q promise service.
             * @param $http             Angular's $http service.
             */
            function CustomerService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            /**
             * Queries the remote service for possible customer matches.
             *
             * @param possibleCustomers {Array<string>}   Collection of customer last names to lookup.
             */
            CustomerService.prototype.lookupCustomerPartials = function (possibleCustomers) {
                var deferred = this.$q.defer();
                // if nothing submitted return empty collection
                if (!possibleCustomers || possibleCustomers.length === 0) {
                    deferred.resolve([]);
                }
                // build filter
                var filter = '';
                possibleCustomers.forEach(function (possibleHit, index) {
                    if (index !== 0) {
                        filter += ',';
                    }
                    filter += possibleHit;
                });
                // fetch data
                var endpoint = '/api/customers/lookupbyname/' + filter;
                // execute query
                this.$http({
                    method: 'GET',
                    url: endpoint
                }).success(function (response) {
                    deferred.resolve(response.d.results);
                }).error(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            /**
             * Finds a specific customer form the datasource.
             *
             * @param customerID  {number}    Unique ID of the customer.
             */
            CustomerService.prototype.lookupCustomer = function (customerID) {
                var deferred = this.$q.defer();
                // fetch data
                var endpoint = '/api/customers/lookupById/' + customerID;
                this.$http({
                    method: 'GET',
                    url: endpoint
                }).success(function (response) {
                    deferred.resolve(response.d.results[0]);
                }).error(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            CustomerService.$inject = ['$q', '$http'];
            return CustomerService;
        })();
        services.CustomerService = CustomerService;
        angular.module('outlookApp').service('outlookApp.services.customerService', CustomerService);
    })(services = outlookApp.services || (outlookApp.services = {}));
})(outlookApp || (outlookApp = {}));

//# sourceMappingURL=../services/customerService.js.map