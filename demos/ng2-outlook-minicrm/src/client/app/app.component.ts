import { Component } from '@angular/core';

import { LogService } from './services/logService';
import { CustomerCenterComponent } from './customers/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  directives: [
    CustomerCenterComponent
  ],
  providers: [
    LogService
  ],
  template: `<minicrm-customer-center></minicrm-customer-center>`
})
export class AppComponent {
  constructor() { }
}
