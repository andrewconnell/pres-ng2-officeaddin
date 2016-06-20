# `ng2-outlook-minicrm` Demo Cheat Sheet

> heavy use of vscode snippets in this demo
> all have the prefix `acd-##-`

## pre-demo

Get laptop ready before the session

1. Make sure laptop has copies of the docker images

  ```shell
  docker pull andrewconnell/vorlonjs
  docker pull andrewconnell/pres-ng2-officeaddin
  ```

1. reset demo folder => clean angular 2

  - get the SHA for the commit & reset

    ```shell
    git log
    git reset <COMMIT-SHA> .
    ```

  - undo the three files that we'll change in the demo

    ```shell
    git checkout -- demos/ng2-outlook-minicrm/src/client/index.html demos/ng2-outlook-minicrm/src/client/app/app.component.ts demos/ng2-outlook-minicrm/src/client/app/main.ts
    ```

  - remove all stuff that will be added

    ```shell
    git clean -fdx
    ```

  - verify works

    ```shell
    cd demos/ng2-outlook-minicrm
    npm start
    ```

  > to get back to the endpoint git repo:
  > ```
  > git reset --hard HEAD
  > ```

1. open demo snippets in seperate window / vscode snippets
1. ipad with demo notes

## demo

1. explain scenario

  - email shows customers in company CRM
  - mocking CRM using northwind in OData.org
  - NW is HTTP, but office will only do HTTPS
  - Node.js API used as HTTPS proxy => HTTP service

1. show working app - run the app

  this will run the app 100% contained within the container **andrewconnell/pres-ng2-officeaddin**

    ```shell
    docker-compose up
    ```

1. run the demo in the dev container

  this will run the app using the container **andrewconnell/pres-ng2-officeaddin** as the runtime & host of NPM modules & typings, but map the `/src` folder in the container to the `/src` folder in this repo on the HOST machine 

    ```shell
    docker-compose -f docker-compose.demo.yml
    ```

1. look at `app.xml`

1. run in OWA, show doesn't work

  - **[[acd-01]]** - add `office.js` to `index.html`

    ```html
    <script src="https://appsforoffice.microsoft.com/lib/1/hosted/Office.js" type="application/javascript"></script>
    ```

  - update `main.ts` to:

    ```typescript
    export class Ng2App {
      constructor() {
        this.initOfficeAddin();
      }

      private initOfficeAddin(): void {
        Office.initialize = (reason: Office.InitializationReason) => {
          bootstrap(AppComponent);
        };
      }
    }
    let ng2app: Ng2App = new Ng2App(logService);
    ```

1. detour to Anuglar's emphasis on DI... create log service

  - add `services/logService.ts`:

    ```typescript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class LogService {
      public category: string = '';
      private LOG_PREFIX: string = 'ng2MiniCrm';

      constructor () {}

      // [[SNIPPET]] ACD-02-logservice.ts
    }
    ```

  - update `main.ts` to use it:

    ```typescript
    import { LogService } from './services/logService';

    ...

    constructor(private logService: LogService) {}

    ...

    # acd-02
    private initOfficeAddin(): void {
      // >>>>> ADD THIS <<<<<
      this.logService.info('addin loaded');
      // ^^^^^^^^^^^^^^^^^^^^

      Office.initialize = (reason: Office.InitializationReason) => {

        // >>>>> ADD THIS <<<<<
        this.logService.info('initializing Office.js');
        // ^^^^^^^^^^^^^^^^^^^^

        // bootstrap the angular app
        bootstrap(AppComponent)
          // >>>>> ADD THIS <<<<<
          .then(success => this.logService.info('ng2 bootstrap success', success))
          .catch(error => this.logService.error('ng2 bootstrap error', error));
          // ^^^^^^^^^^^^^^^^^^^^
      };
    }

    ...

    let logService: LogService = new LogService();
    logService.category = 'bootstrap';
    ```

1. build first component: `/customers/customer-center.component.ts`

  ```typescript
  import { Component, OnInit } from '@angular/core';

  import { LogService } from '../services/logService';

  @Component({
    moduleId: module.id,
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
  ```

  ```html
  <!-- [[SNIPPET]] ACD-03 -->
  <div id="addinHeading"
      class='ms-font-xl ms-bgColor-themePrimary ms-fontColor-white'>
    <div>Possible customers found in this email...</div>
  </div>
  ```

  ```css
  /* [[SNIPPET]] ACD-04 */
  #addinHeading {
    margin: 0 0 15 0;
    padding: 2 10 2 10;
  }
  ```

  go back and update `index.html` for Office UI Fabric

  ```html
  <!-- [[SNIPPET]] ACD-05 -->
  <link rel="stylesheet" href="/vendor/office-ui-fabric/dist/css/fabric.min.css">
  <link rel="stylesheet" href="/vendor/office-ui-fabric/dist/css/fabric.components.min.css">
  ```

1. update `app.component.ts` to:

  ```typescript
  import { Component } from '@angular/core';

  import { LogService } from './services/logService';
  import { CustomerCenterComponent } from './customers/customer-center.component';

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
  ```

1. test it!

1. add two more services, `officeService.ts` & `crmService.ts` ... explain
  - [[SNIPPET]] acd-10: `officeService.ts`
  - [[SNIPPET]] acd-11: `crmService.ts`

  - because `crmService.ts` uses HTTP, go back to `main.ts` and inject it into the whole app

      ```typescript
      import { HTTP_PROVIDERS } from '@angular/http';

      ...

      bootstrap(AppComponent, [HTTP_PROVIDERS])
      ```

    inject them into the whole customer module... update `customer-center.component.ts`

      ```typescript
      import { OfficeService } from '../services/officeService';
      import { CrmService } from '../services/crmService';

      ...

      providers: [
        OfficeService,
        CrmService
      ],
      ```

1. add a new list component: 
  - [[SNIPPET]] acd-06: `customer-list.component.ts`
  - [[SNIPPET]] acd-07: `customer-list.component.html`
  - [[SNIPPET]] acd-08: `customer-list.component.css`
1. update the databinding in the view with the public item:
  - `*ngFor` on opening `<div>`: `let customer of lookupCandidates`
  - `{{getCustomerInitials(customer)}}`

    ```typescript
    // [[SNIPPET]] acd-09
    private getCustomerInitials(customer: ICustomer): string {
      return customer.name.replace(/[a-z]/g, '').replace(' ', '');
    }
    ```
  - `{{customer.name}}`
  - `{{customer.title}}`
  - `{{customer.companyName}}`
  - `{{customer.phone}}`

1. go back and add it to the `customer-center.component.*`

  ```typescript
  import { CustomerListComponent } from './customer-list.component';

  ...

  directives: [CustomerListComponent],

  ...

  <minicrm-customer-list></minicrm-customer-list>
  ```

1. show VorlonJS