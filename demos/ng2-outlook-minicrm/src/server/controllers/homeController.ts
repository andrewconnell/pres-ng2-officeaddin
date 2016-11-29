import * as debug from 'debug';
let log: debug.IDebugger = debug('ng2minicrm:homeController');

import * as express from 'express';

export class HomeController {
  constructor(private app: express.Application) {
    this.loadRoutes();
  }

  /**
   * Setup routing for controller.
   */
  public loadRoutes(): void {
    log('loading routes');
    // setup home route for application
    this.app.get('/', this.handleRootGet);
  }

  /**
   * @description
   *  Handler for the request for the default home route.
   *
   * @param request {express.Request} HTTP request object.
   * @param response {express.Response} HTTP response object.
   */
  private handleRootGet(request: express.Request, response: express.Response): void {
    log('handle GET /');

    // render the view
    response.render('home/index', {/* model would go here */ });
  }
}
