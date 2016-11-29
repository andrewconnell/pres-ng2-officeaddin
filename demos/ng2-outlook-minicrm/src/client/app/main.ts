import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

/**
 * Utility to initialize office.js for hosting Office app, then
 * load the Angular 2 application.
 *
 * @export
 * @class AppLoader
 */
export class AppLoader {
  constructor() {
    this.initOfficeAddin();
  }


  /**
   * Initialize the Office Addin. Must call the `Office.initialize()` method & have it complete within 5s of the Addin
   * being called by the hosting Office client app. That should trigger a callback that loads of the Angular application.
   *
   * @private
   *
   * @memberOf AppLoader
   */
  private initOfficeAddin(): void {
    // init the Office Addin
    Office.initialize = (reason: Office.InitializationReason) => {
      // write out the thing that caused it
      console.log('initializing Office.js');

      // bootstrap the angular app
      platformBrowserDynamic().bootstrapModule(AppModule)
        .then(success => console.log('ng2 bootstrap success', success))
        .catch(error => console.error('ng2 bootstrap error', error));
    };
  }
}

// create instance of the app
let ng2app: AppLoader = new AppLoader();
