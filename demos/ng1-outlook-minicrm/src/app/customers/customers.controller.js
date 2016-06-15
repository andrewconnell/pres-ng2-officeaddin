/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/app.d.ts" />
var outlookApp;
(function (outlookApp) {
    var customers;
    (function (customers) {
        var CustomersController = (function () {
            function CustomersController($q, $location, officeService, customerService) {
                var _this = this;
                this.$q = $q;
                this.$location = $location;
                this.officeService = officeService;
                this.customerService = customerService;
                this.lookupCandidates = [];
                this.matchCandidates = [];
                this.loadMatchesFromEmail().then(function () {
                    return _this.getCadidateCustomersFromService();
                });
            }
            /**
             * Load the possible candidate matches in the email within the app.
             * @returns {Promise<T>|IPromise<T>}
             */
            CustomersController.prototype.loadMatchesFromEmail = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.officeService.getWordCandidatesFromEmail().then(function (candidates) {
                    _this.lookupCandidates = candidates;
                    deferred.resolve();
                }).catch(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            /**
             * Query the lookup service to get a list of all matching candidates.
             *
             * @returns {Promise<T>|IPromise<T>}
             */
            CustomersController.prototype.getCadidateCustomersFromService = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.customerService.lookupCustomerPartials(this.lookupCandidates).then(function (candidates) {
                    _this.matchCandidates = candidates;
                    deferred.resolve();
                }).catch(function (error) {
                    console.log('>>> failed getCadidateCustomersFromService', error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            /**
             * Changes the view to the the customer detail page.
             *
             * @param customer {object}   Customer selected from the list.
             */
            CustomersController.prototype.goToCustomer = function (customer) {
                this.$location.path('/' + customer.CustomerID);
            };
            CustomersController.$inject = ['$q', '$location', 'outlookApp.services.officeService', 'outlookApp.services.customerService'];
            return CustomersController;
        })();
        customers.CustomersController = CustomersController;
        angular.module('outlookApp').controller('outlookApp.customers.customersController', CustomersController);
    })(customers = outlookApp.customers || (outlookApp.customers = {}));
})(outlookApp || (outlookApp = {}));

//# sourceMappingURL=../customers/customers.controller.js.map