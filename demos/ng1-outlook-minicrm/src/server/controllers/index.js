/// <reference path="../../../tools/typings/tsd.d.ts" />
/// <reference path="../../../tools/typings/server.d.ts" />
var HomeController = require('./homeController');
var ApiController = require('./apiController');
var Controllers = (function () {
    function Controllers(app) {
        this.app = app;
    }
    Controllers.prototype.init = function () {
        var home = new HomeController(this.app);
        var api = new ApiController(this.app);
    };
    return Controllers;
})();
module.exports = Controllers;

//# sourceMappingURL=../controllers/index.js.map