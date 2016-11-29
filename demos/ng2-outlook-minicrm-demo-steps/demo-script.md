# `ng2-outlook-minicrm` Demo Cheat Sheet

> heavy use of VSCode snippets in this demo
>
> all have the prefix `acd-##-`

## pre-demo

Get laptop ready before the session

1. Make sure laptop has copies of the docker images

    ```shell
    $ docker pull andrewconnell/vorlonjs
    $ docker pull andrewconnell/pres-ng2-officeaddin
    ```

1. reset demo folder => clean angular 2

    - switch to the live demo branch

      ```shell
      $ git checkout ng2-demo-start
      ```

    - remove all stuff that will be added

      ```shell
      $ git clean -fdx
      ```

    - get all npm packages

      ```shell
      $ npm install
      ```

    - verify works

      ```shell
      $ cd demos/ng2-outlook-minicrm
      $ npm run build
      $ npm start
      ```

1. ipad with demo notes

## demo

1. explain scenario

    - email shows customers in company CRM
    - mocking CRM using northwind in OData.org
    - Northwind is HTTP, but office will only do HTTPS
    - Node.js API used as HTTPS proxy => HTTP service

1. show working app - run the app

    this will run the app 100% contained within the container **andrewconnell/pres-ng2-officeaddin**

      ```shell
      $ npm run docker:start
      ```

1. run the demo in the dev container

    this will run the app using the container **andrewconnell/pres-ng2-officeaddin** as the runtime & host of NPM modules & typings, but map the `/src` folder in the container to the `/src` folder in this repo on the HOST machine 

      ```shell
      $ npm run docker:dev
      ```

    1. show (with no errors) the app running outside of outlook: https://localhost
    1. Walk though the source code explaining how it works

        - `package.json`
          - dependencies
          - `@types`
          - NPM scripts
        - `tsconfig.json`
          - experimental stuff for TypeScript & Angular
        - docker
          - `Dockerfile`
          - `docker-compose*.yml`

1. look at `app.xml`
1. run in OWA, show doesn't work

    - **[[acd-01]]** - add `office.js` to `index.html`

      ```html
      <script src="https://appsforoffice.microsoft.com/lib/1/hosted/Office.js" type="application/javascript"></script>
      ```

    - update `main.ts` to:
      <!-- [[SNIPPET]] ACD-02 -->
      
      ```typescript
      export class AppLoader {
        constructor() {
          this.initOfficeAddin();
        }
        private initOfficeAddin(): void {
          Office.initialize = (reason: Office.InitializationReason) => {
            console.log('initializing Office.js');

            platformBrowserDynamic().bootstrapModule(AppModule)
              .then(success => console.log('ng2 bootstrap success', success))
              .catch(error => console.error('ng2 bootstrap error', error));
          };
        }
      }
      let ng2app: AppLoader = new AppLoader();
      ```

1. test app in Outlook to see if it's loading iwthout errors
1. build first component: `customer-center.component.ts`

    - create subfolder: `/src/client/app/customers`
    - create file: `customer-center.component.ts`

      ```typescript
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
      ```

    - create file: `customer-center.component.html`

      ```html
      <!-- [[SNIPPET]] ACD-03 -->
      <div id="addinHeading"
          class='ms-font-xl ms-bgColor-themePrimary ms-fontColor-white'>
        <div>Possible customers found in this email...</div>
      </div>
      ```

    - create file: `customer-center.component.css`

      ```css
      /* [[SNIPPET]] ACD-04 */
      #addinHeading {
        margin: 0 0 15 0;
        padding: 2 10 2 10;
      }
      ```

    since we'll have a few things in this folder, make it easier to load them by creating a barrel `index.ts`:

      ```typescript
      export * from './customer-center.component';
      ```

    go back and update `index.html` for Office UI Fabric:

      ```html
      <!-- [[SNIPPET]] ACD-05 -->
      <link rel="stylesheet" href="/vendor/office-ui-fabric/dist/css/fabric.min.css">
      <link rel="stylesheet" href="/vendor/office-ui-fabric/dist/css/fabric.components.min.css">
      ```

1. update `app.component.ts` to include the new child component for customer center

    ```typescript
    import { Component } from '@angular/core';

    @Component({
      moduleId: module.id,
      selector: 'my-app',
      template: `<minicrm-customer-center></minicrm-customer-center>`
    })
    export class AppComponent { }
    ```

    update `app.module.ts` in order to use it, need to inject it into the root module:

    ```typescript
    import { CustomerCenterComponent } from './customers/index';

    ...

    declarations: [
      AppComponent,
      #### ADD THIS:
      CustomerCenterComponent
      #### ^^^^^^^^^
    ],
    ```

1. test it!

1. add two services, `officeService.ts` & `crmService.ts` ... explain

    - create new folder `/src/client/app/services`
    - [[SNIPPET]] acd-10: `officeService.ts`
    - [[SNIPPET]] acd-11: `crmService.ts`
    - create a barrel `index.ts`

      ```typescript
      export * from './crmService';
      export * from './officeService';
      ```

    - because `crmService.ts` uses HTTP, go back to `app.module.ts` and inject it into the whole root module:

        ```typescript
        import { HttpModule } from '@angular/http';

        ...

        imports: [
          BrowserModule,
          #### ADD THIS:
          HttpModule
          #### ^^^^
        ],
        ```

      also inject the two new services into the root module `app.module.ts`:

      ```typescript
      import {
        CrmService,
        OfficeService
      } from './services/index';

      ...

      @NgModule({
        #### ADD THIS:
        providers: [
          CrmService,
          OfficeService
        ]
        #### ^^^^
      })
      ```

1. add a new list component: 

    - [[SNIPPET]] acd-06: `customer-list.component.ts`
    - [[SNIPPET]] acd-07: `customer-list.component.html`
    - [[SNIPPET]] acd-08: `customer-list.component.css`

1. update the databinding in the view with the public item:
    - on opening `<div>`, make repeating: 
    
      ```html
      <div *ngFor="let customer of lookupCandidates"
      ```

    - line ~6, for initials:

      ```html
      <div class="ms-Persona-initials ms-Persona-initials--blue">{{getCustomerInitials(customer)}}</div>
      ```
    
    - update details for contact
      - `{{customer.name}}`
      - `{{customer.title}}`
      - `{{customer.companyName}}`
      - `{{customer.phone}}`

1. go back and add the customer list to the it to the root module `customer-center.component.html`:

    ```html
    <!-- add this to the last line -->
    <minicrm-customer-list></minicrm-customer-list>
    ```

    - add this to the root module: `app.module.ts`

    ```typescript
    import {
      CustomerCenterComponent,
      ### ADD THIS:
      CustomerListComponent
      ### ^^^^^
    } from './customers/index';
    ```

1. show VorlonJS: `https://localhost:1337`
