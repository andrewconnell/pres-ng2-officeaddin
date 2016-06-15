/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/server.d.ts" />
var HomeController = (function () {
    function HomeController(app) {
        this.app = app;
        this.loadRoutes();
    }
    /**
     * Setup routing for controller.
     */
    HomeController.prototype.loadRoutes = function () {
        // setup home route for application
        this.app.get('/', function (request, response) {
            response.render('home/index', {});
        });
    };
    return HomeController;
})();
module.exports = HomeController;

//# sourceMappingURL=../controllers/homeController.js.map