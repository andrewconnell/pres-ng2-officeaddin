/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/server.d.ts" />
var request = require('request');
var ApiController = (function () {
    function ApiController(app) {
        this.app = app;
        this.loadRoutes();
    }
    /**
     * Setup routing for controller.
     */
    ApiController.prototype.loadRoutes = function () {
        // get all customers
        this.app.get('/api/customers', this._queryCustomers);
        // filter customers
        this.app.get('/api/customers/lookupByName/:customerNames', this._queryCustomerByName);
        this.app.get('/api/customers/lookupById/:customerId', this._queryCustomerById);
    };
    /* ======================================================================= */
    ApiController.prototype._queryCustomers = function (expRequest, expResponse) {
        // build query
        var endpoint = 'http://services.odata.org/V3/Northwind/Northwind.svc/Customers?';
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        };
        // execute query
        console.log('executing query: ' + endpoint);
        request(endpoint, options, function (error, response, body) {
            console.log('query response', body);
            expResponse.send(body);
        });
    };
    ApiController.prototype._queryCustomerByName = function (expRequest, expResponse) {
        // get query params
        var customerNames = expRequest.params.customerNames.split(',');
        // build filter
        var filter = '';
        customerNames.forEach(function (customerName, index) {
            // add 'or' prefix if this isn't the first one
            if (index > 0) {
                filter += ' or ';
            }
            filter += 'endswith(ContactName,\'' + customerName + '\')';
        });
        // build query
        var endpoint = 'http://services.odata.org/V3/Northwind/Northwind.svc/Customers?' + '$select=CustomerID,ContactName,ContactTitle' + '&$filter=' + filter;
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        };
        // execute query
        console.log('executing query: ' + endpoint);
        request(endpoint, options, function (error, response, body) {
            console.log('query response', body);
            expResponse.send(body);
        });
    };
    ApiController.prototype._queryCustomerById = function (expRequest, expResponse) {
        // get query param
        var customerId = expRequest.params.customerId;
        // build query
        var endpoint = 'http://services.odata.org/V3/Northwind/Northwind.svc/Customers?' + '$filter=CustomerID eq \'' + customerId + '\'';
        var options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        };
        // execute query
        console.log('executing query: ' + endpoint);
        request(endpoint, options, function (error, response, body) {
            console.log('query response', body);
            expResponse.send(body);
        });
    };
    return ApiController;
})();
module.exports = ApiController;

//# sourceMappingURL=../controllers/apiController.js.map