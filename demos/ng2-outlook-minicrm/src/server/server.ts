import * as debug from 'debug';
let log: debug.IDebugger = debug('ng2minicrm:server');

import * as os from 'os';
import * as colors from 'colors';

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
let logger: any = require('connect-logger');
let expressHandlebars: any = require('hbs');

log('loading controllers');
import { Controllers } from './controllers/index';

// setup express
log('setup express');
let app: express.Express = express();
app.use(logger());

// setup express to have static resource folders
app.use('', express.static(__dirname + '/../client'));
app.use('/vendor', express.static(__dirname + '/../../node_modules'));

// configure handlebars as the view engine
expressHandlebars.registerPartials(__dirname + '/views');
// configure express to use handlebars as the view engine
app.set('view engine', 'hbs');
// change express default where to look for views on the server
app.set('views', __dirname + '/views');

// load UX and API controllers
log('initialize controllers');
let controllers: Controllers = new Controllers(app);
controllers.init();

// setup ssl self hosting (use the same certs from browsersync)
let httpsOptions: https.ServerOptions = {
  cert: fs.readFileSync(__dirname + '/../../node_modules/browser-sync/lib/server/certs/server.crt'),
  key: fs.readFileSync(__dirname + '/../../node_modules/browser-sync/lib/server/certs/server.key')
};
let httpServerPort: number = process.env.PORT || 3433;  // use server value (for Azure) or local port

// create & startup HTTPS webserver
https.createServer(httpsOptions, app)
     .listen(httpServerPort);

console.log(colors.cyan('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+'));
console.log(colors.green('Starting up https server...'));
console.log(colors.green('Available on:'));

// list IPs listening on
let networks: { [index: string]: os.NetworkInterfaceInfo[] } = os.networkInterfaces();
Object.keys(networks).forEach((device: string) => {
  networks[device].forEach((details: os.NetworkInterfaceInfo) => {
    if (details.family === 'IPv4') {
      console.log(colors.yellow('  https://' + details.address + ':' + httpServerPort));
    }
  });
});

console.log(colors.gray('Hit CTRL-C to stop the server'));
console.log(colors.cyan('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+'));
