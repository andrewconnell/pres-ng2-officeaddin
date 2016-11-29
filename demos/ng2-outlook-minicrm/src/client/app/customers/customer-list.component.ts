import { Component, OnInit } from '@angular/core';

import {
  CrmService,
  OfficeService
} from '../services/index';
import { ICustomer } from '../../../shared/models/ICustomer';

@Component({
  moduleId: module.id,
  providers: [
    CrmService,
    OfficeService
  ],
  selector: 'minicrm-customer-list',
  styleUrls: ['customer-list.component.css'],
  templateUrl: 'customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  /**
   * @description
   *  Array of customers to display in the view.
   */
  public lookupCandidates: ICustomer[] = [];

  /**
   * Creates new instance of CustomerListComponent.
   *
   * @param  {OfficeService}  officeService - DI by Angular
   * @param  {CrmService}     crmService    - DI by Angular
   */
  constructor(
    private officeService: OfficeService,
    private crmService: CrmService) { }

  /**
   * Called right after the directive's data-bound properties have been
   * checked for the first time, and before any of its children have been
   * checked. It is invoked only once when the directive is instantiated.
   */
  public ngOnInit(): void {
    console.log('ngOnInit: CustomerListComponent');

    // lookup customers from currently selected email
    this.loadMatchesFromEmail();
  }

  /**
   * Get possible names from the currently selected email & query the MiniCRM
   * for possible matches.
   *
   * @returns void
   */
  private loadMatchesFromEmail(): void {
    // use the OfficeService to get all words that start with a capital letter
    //  which are possible name candidates
    this.officeService.getWordCandidatesFromEmail()
      .then((candidates: string[]) => {
        // take candidate words from email & submit to MiniCRM to find matching
        //  customers
        this.crmService.lookupCustomerPartials(candidates)
          .then((results: ICustomer[]) => {
            // take the matching customers to assign to the public property
            //  on the component
            this.lookupCandidates = results;
          });
      });
  }

  private getCustomerInitials(customer: ICustomer): string {
    return customer.name.replace(/[a-z]/g, '').replace(' ', '');
  }
}
