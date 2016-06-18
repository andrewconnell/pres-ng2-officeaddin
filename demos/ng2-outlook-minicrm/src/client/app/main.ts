import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app.component';

import { LogService } from './services/logService';

export class Ng2App {
  constructor(private logService: LogService) {
    this.initOfficeAddin();
  }

  private initOfficeAddin(): void {
    this.logService.info('addin loaded');

    Office.initialize = (reason: Office.InitializationReason) => {
      // write out the thing that caused it
      this.logService.info('initializing Office.js');

      // bootstrap the angular app
      bootstrap(AppComponent, [HTTP_PROVIDERS])
        .then(success => this.logService.info('ng2 bootstrap success', success))
        .catch(error => this.logService.error('ng2 bootstrap error', error));
    };
  }
}

// create instance of the app
let logService: LogService = new LogService();
logService.category = 'bootstrap';
let ng2app: Ng2App = new Ng2App(logService);
