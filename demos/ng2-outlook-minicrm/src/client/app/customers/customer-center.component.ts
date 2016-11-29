import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'minicrm-customer-center',
  styleUrls: ['customer-center.component.css'],
  templateUrl: 'customer-center.component.html'
})
export class CustomerCenterComponent implements OnInit {
  public ngOnInit(): void {
    console.log('ngOnInit: CustomerCenterComponent');
  }
}
