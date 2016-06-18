import { Component, OnInit } from '@angular/core';

import { LogService } from '../services/logService';
import { OfficeService } from '../services/officeService';
import { CrmService } from '../services/crmService';
import { CustomerListComponent } from './customer-list.component';

@Component({
  moduleId: module.id,
  directives: [CustomerListComponent],
  providers: [
    OfficeService,
    CrmService
  ],
  selector: 'minicrm-customer-center',
  templateUrl: 'customer-center.component.html',
  styleUrls: ['customer-center.component.css']
})
export class CustomerCenterComponent implements OnInit {
  constructor(private logService: LogService) { }

  public ngOnInit() {
    this.logService.info('ngOnInit: CustomerCenterComponent');
  }
}
