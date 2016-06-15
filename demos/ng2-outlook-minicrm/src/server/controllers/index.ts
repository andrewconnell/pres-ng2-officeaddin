import * as debug from 'debug';
let log: debug.IDebugger = debug('ng2minicrm:controllers');

import * as express from 'express';
// load controllers
import { ApiController } from './apiController';
import { HomeController } from './homeController';

export class Controllers {
  constructor(private app: express.Application) {}

  public init() {
    log('instatiate controllers');
    // instatiate each controller
    let api: ApiController = new ApiController(this.app);
    let home: HomeController = new HomeController(this.app);
  }

}
