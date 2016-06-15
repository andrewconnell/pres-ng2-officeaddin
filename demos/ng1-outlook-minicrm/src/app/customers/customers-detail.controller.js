/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/app.d.ts" />
var outlookApp;
(function (outlookApp) {
    var customers;
    (function (customers) {
        'use strict';
        var CustomerDetailController = (function () {
            /**
             * Controller constructor
             * @param $q                Angular's $q promise service.
             * @param $window           Angular's $window service.
             * @param $location         Angular's $location service.
             * @param $routeParams      Angular's $routeParams service.
             * @param customerService   Custom Angular service for customer data.
             */
            function CustomerDetailController($q, $window, $location, $routeParams, customerService) {
                this.$q = $q;
                this.$window = $window;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.customerService = customerService;
                this.customer = {};
                // if ID is passed in, load customer
                var customerId = $routeParams.customerID;
                if (customerId) {
                    this.loadCustomer(customerId);
                }
                else {
                    this.$location.path('/');
                }
            }
            /**
             * Load the specified customer.
             *
             * @param customerID {number}   ID of the selected customer to display.
             */
            CustomerDetailController.prototype.loadCustomer = function (customerID) {
                var _this = this;
                var deferred = this.$q.defer();
                this.customerService.lookupCustomer(customerID).then(function (customer) {
                    _this.customer = customer;
                    deferred.resolve();
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            /**
             * Navigates back to the list.
             */
            CustomerDetailController.prototype.goBack = function () {
                this.$window.history.back();
            };
            CustomerDetailController.$inject = ['$q', '$window', '$location', '$routeParams', 'outlookApp.services.customerService'];
            return CustomerDetailController;
        })();
        // register the controller
        angular.module('outlookApp').controller('outlookApp.customers.customersDetailController', CustomerDetailController);
    })(customers = outlookApp.customers || (outlookApp.customers = {}));
})(outlookApp || (outlookApp = {}));

//# sourceMappingURL=../customers/customers-detail.controller.js.map