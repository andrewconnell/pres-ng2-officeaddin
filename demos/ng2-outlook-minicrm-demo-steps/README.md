# Mini CRM Office Add-in for Outlook in Angular 2

This sample simulates a Mini-CRM system to demonstrate a custom Outlook Add-in, written in Angular 2.


## What Does It Do?

Once installed into Outlook, the add-in pulls all potential names from the body of an email and looks them up in the sample [Northwind OData service](http://services.odata.org/V3/Northwind/Northwind.svc/Customers) hosted on [OData.org](http://odata.org).


## How It Works

The web applications that implement Office Add-ins must be served over HTTPS in order to load in the hosting Office client application. Because the sample Northwind service is only served over HTTP, a locally hosted Node.js server is served over HTTPS which acts as a proxy to the Northwind service.

The Outlook Add-in is built using Angular 2. The application is hosted within a Docker container to simpilfy execution of the demo.


## Running the Application

The working application is hosted within a Docker container and is available in AC's public Docker hub: [andrewconnell/pres-ng2-officeaddin](https://hub.docker.com/r/andrewconnell/pres-ng2-officeaddin/). A Docker compose file (`docker-compose.yml`) in the root of the source of the demo will spin the application up and expose the necessary ports to the host computer:

```shell
$ docker-compose up
```

This will spin up two containers:
- Angular 2 Office Addin for Outlook hosted on https://localhost
- VorlonJS website hosted on https://localhost:1337

  > VorlonJS is a remote debugging utility that is not required for the demo but shows cool remote debugging capabilities.

To run this, you need Docker installed which is available in multiple formats:
- **Docker for Mac & Windows** - install Docker on your OS (this is the easiest way)... get it hereP https://www.docker.com/products/overview
- **Docker in a VM on your laptop** - steps for all platforms here: [Get Started with Docker](https://docs.docker.com/mac/)

Side-load the Office Add-in for Outlook into your Outlook Web App by uploading the file located at `https://localhost/app.xml`.

Test the website by browsing to `https://localhost`. There should be JavaScript errors in the console (`because it's expecting to be hosted within Outlook`), but you can ignore them. Look in the address bar of your browser. If it shows that the SSL certificate is not trusted, you will need to trust it for the application to run in an Office client. Office clients will not run add-ins who's websites are secured with untrusted certificates. Depending on your platform, add the self-signed certificate to the your local machine's trusted root authority. The Node.js webserver uses the self-signed certificate from [Browsersync.io](http://browsersync.io) which is quite popular and you very well may have already trusted it.

> You can also run the application locally without Docker, but you will have to change some paths. The Node.js webserver that hosts the application can be started from the root folder `npm start`. This launches a webserver on `https://localhost:3433`. Before running the application make sure you install all node modules (`npm install`) and TypeScript type definitions (`typings install`). Running using the Docker images is simplier because everything is included in the container.
