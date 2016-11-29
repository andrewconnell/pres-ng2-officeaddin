import * as debug from 'debug';
let log: debug.IDebugger = debug('ng2minicrm:apiController');

import { INorthwindRestCustomer } from '../models/INorthwindRestCustomer';
import { ICustomer } from '../../shared/models/ICustomer';
import { Application, Request, Response } from 'express';
import * as request from 'request';
import * as http from 'http';

export class ApiController {
  private static NW_CUSTOMER_HTTP_ENDPOINT: string = 'http://services.odata.org/V3/Northwind/Northwind.svc/Customers';
  private static NW_CUSTOMER_HTTP_REQUEST_HEADER: request.CoreOptions = {
    headers: {
      'Accept': 'application/json;odata=verbose'
    },
    method: 'GET'
  };


  constructor(private app: Application) {
    this.loadRoutes();
  }

  /**
   * Setup routing for controller.
   */
  public loadRoutes(): void {
    log('configuring routes');

    // get all customers
    this.app.get('/api/customers', this.handleGetCustomers);

    // filter customers
    this.app.get('/api/customers/lookupByName/:customerNames', this.handleGetCustomerByName);
    this.app.get('/api/customers/lookupById/:customerId', this.handleGetCustomerById);
  }

  /**
   * @description
   *  Handle the request for all customers.
   *
   * @param request {express.Request} HTTP request object.
   * @param response {express.Response} HTTP response object.
   */
  private handleGetCustomers(expRequest: Request, expResponse: Response): void {
    log('handle HTTP GET /api/customers');

    // build query
    let queryEndpoint: string = ApiController.NW_CUSTOMER_HTTP_ENDPOINT;

    let options: request.CoreOptions = {
      headers: {
        'Accept': 'application/json;odata=verbose'
      },
      method: 'GET'
    };

    // execute query
    log('executing query: ' + queryEndpoint);
    request(
      queryEndpoint,
      <request.CoreOptions>ApiController.NW_CUSTOMER_HTTP_REQUEST_HEADER,
      (error: any, response: http.IncomingMessage, body: string) => {
        if (error) {
          log('error submitting request to Northwind: ' + error);
          expResponse.status(500).send(error);
        } else if (response.statusCode !== 200) {
          let errorMessage: string = '[' + response.statusCode + ']' + response.statusMessage;
          log('error submitting request to Northwind: ' + errorMessage);
          expResponse.status(500).send(errorMessage);
        } else {
          log('response body received from Northwind: ' + body);

          // collection of customers
          let customers: ICustomer[] = new Array<ICustomer>();
          // convert response to internal model
          let nwCustomers: INorthwindRestCustomer[] = <INorthwindRestCustomer[]>(JSON.parse(body)).d.results;
          for (let nwCustomer of nwCustomers) {
            customers.push(<ICustomer>{
              companyName: nwCustomer.CompanyName,
              id: nwCustomer.CustomerID,
              name: nwCustomer.ContactName,
              phone: nwCustomer.Phone,
              title: nwCustomer.ContactTitle
            });
          }

          // send response of customers
          expResponse.status(200).send(customers);
        }
      });
  }

  /**
   * @description
   *  Handler for the request for specific customer by name.
   *
   * @param request {express.Request} HTTP request object.
   * @param response {express.Response} HTTP response object.
   */
  private handleGetCustomerByName(expRequest: Request, expResponse: Response): void {
    log('handle HTTP GET /api/customers');

    // get query params
    let customerNames: string[] = expRequest.params.customerNames.split(',');

    // build filter
    let filter: string = '';
    customerNames.forEach((customerName, index) => {
      // add 'or' prefix if this isn't the first one
      if (index > 0) {
        filter += ' or ';
      }
      filter += 'endswith(ContactName,\'' + customerName + '\')';
    });

    // build query
    let queryEndpoint: string = ApiController.NW_CUSTOMER_HTTP_ENDPOINT
      + '?$select=CustomerID,ContactName,ContactTitle,CompanyName,Phone'
      + '&$filter=' + filter;

    // execute query
    log('executing query: ' + queryEndpoint);
    request(
      queryEndpoint,
      <request.CoreOptions>ApiController.NW_CUSTOMER_HTTP_REQUEST_HEADER,
      (error: any, response: http.IncomingMessage, body: string) => {
        if (error) {
          log('error submitting request to Northwind: ' + error);
          expResponse.status(500).send(error);
        } else if (response.statusCode !== 200) {
          let errorMessage: string = '[' + response.statusCode + ']' + response.statusMessage;
          log('error submitting request to Northwind: ' + errorMessage);
          expResponse.status(500).send(errorMessage);
        } else {
          log('response body received from Northwind: ' + body);

          // collection of customers
          let customers: ICustomer[] = new Array<ICustomer>();
          // convert response to internal model
          let nwCustomers: INorthwindRestCustomer[] = <INorthwindRestCustomer[]>(JSON.parse(body)).d.results;
          if (nwCustomers.length > 0) {
            for (let nwCustomer of nwCustomers) {
              customers.push(<ICustomer>{
                companyName: nwCustomer.CompanyName,
                id: nwCustomer.CustomerID,
                name: nwCustomer.ContactName,
                phone: nwCustomer.Phone,
                title: nwCustomer.ContactTitle
              });
            }
          }

          // send response of customers
          expResponse.status(200).send(customers);
        }
      });
  }

  private handleGetCustomerById(expRequest: Request, expResponse: Response): void {
    log('handle HTTP GET /api/customers');

    // get query params
    let customerId: string = expRequest.params.customerId;

    // build query
    let queryEndpoint: string = ApiController.NW_CUSTOMER_HTTP_ENDPOINT
      + '?$select=CustomerID,ContactName,ContactTitle,CompanyName,Phone'
      + '&$filter=CustomerID eq \'' + customerId + '\'';

    // execute query
    log('executing query: ' + queryEndpoint);
    request(
      queryEndpoint,
      <request.CoreOptions>ApiController.NW_CUSTOMER_HTTP_REQUEST_HEADER,
      (error: any, response: http.IncomingMessage, body: string) => {
        if (error) {
          log('error submitting request to Northwind: ' + error);
          expResponse.status(500).send(error);
        } else if (response.statusCode !== 200) {
          let errorMessage: string = '[' + response.statusCode + ']' + response.statusMessage;
          log('error submitting request to Northwind: ' + errorMessage);
          expResponse.status(500).send(errorMessage);
        } else {
          log('response body received from Northwind: ' + body);

          // collection of customers
          let customers: ICustomer[] = new Array<ICustomer>();
          // convert response to internal model
          let nwCustomers: INorthwindRestCustomer[] = <INorthwindRestCustomer[]>(JSON.parse(body)).d.results;
          if (nwCustomers.length > 0) {
            for (let nwCustomer of nwCustomers) {
              customers.push(<ICustomer>{
                companyName: nwCustomer.CompanyName,
                id: nwCustomer.CustomerID,
                name: nwCustomer.ContactName,
                phone: nwCustomer.Phone,
                title: nwCustomer.ContactTitle
              });
            }
          }

          // send response of customers
          expResponse.status(200).send(customers);
        }
      });
  }

}
