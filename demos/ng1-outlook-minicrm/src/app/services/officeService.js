/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/app.d.ts" />
/// <reference path="../../../tools/typings/custom.d.ts" />
var outlookApp;
(function (outlookApp) {
    var services;
    (function (services) {
        var OfficeService = (function () {
            /**
             * Custom Angular service that works with the host Office client.
             *
             * @param $q                Angular's $q promise service.
             */
            function OfficeService($q) {
                this.$q = $q;
            }
            /**
             * Retrieves a collection of all possible names in the currently selected email.
             *
             * @returns {Array<string>}   Collection of potential names.
             */
            OfficeService.prototype.getWordCandidatesFromEmail = function () {
                var deferred = this.$q.defer();
                try {
                    var currentEmail = Office.cast.item.toItemRead(Office.context.mailbox.item);
                    // get list of all words in email that start with an upper case letter
                    //  these are potential names of employees
                    deferred.resolve(currentEmail.getRegExMatches().PossibleName);
                }
                catch (error) {
                    deferred.reject(error);
                }
                return deferred.promise;
            };
            OfficeService.$inject = ['$q'];
            return OfficeService;
        })();
        services.OfficeService = OfficeService;
        angular.module('outlookApp').service('outlookApp.services.officeService', OfficeService);
    })(services = outlookApp.services || (outlookApp.services = {}));
})(outlookApp || (outlookApp = {}));

//# sourceMappingURL=../services/officeService.js.map