import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LogService } from '../services/logService';
import { ICustomer } from '../../../shared/models/ICustomer';

@Injectable()
export class CrmService {

  /**
   * Creates new instance of CrmService.
   *
   * @param  {Http} http               - DI by Angular
   * @param  {LogService} logService   - DI by Angular
   * @param  {OfficeService} officeService - DI by Angular
   * @param  {CrmService} crmService   - DI by Angular
   */
  constructor(private http: Http,
              private logService: LogService) { }

  /**
   * Get customers from MiniCRM that match the specified values.
   *
   * @param  {string[]} possibleCustomers   - Array of possible customer names.

   * @returns Promise<ICustomer[]>          - Array of matching customers in the MiniCRM system.
   */
  public lookupCustomerPartials(possibleCustomers: string[]): Promise<ICustomer[]> {
    let promise: Promise<ICustomer[]> = new Promise<ICustomer[]>((resolve, reject) => {
      try {
        // if no names provided, return empty
        if (!possibleCustomers || possibleCustomers.length === 0) {
          this.logService.warn('lookupCustomerPartials(): no candidates provided to lookup');
          resolve(new Array<ICustomer>());
        }

        // build the filter
        let filter: string = possibleCustomers.join(',');

        // create lookup query
        let queryEndpoint = '/api/customers/lookupbyname/' + filter;

        // execute the query
        this.http.request(queryEndpoint)
          .subscribe((response: Response) => {
            this.logService.log('lookupCustomerPartials(): response from API', response);
            resolve(<ICustomer[]>response.json());
          });
      } catch (error) {
        reject(error);
      }
    });

    return promise;
  }

}
