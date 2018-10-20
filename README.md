# TestFlask Manager UI

Visit [TestFlask GitHub Page](https://testflask.github.io) for more details.

This is an Angular2 SPA for managing [TestFlask](https://github.com/FatihSahin/test-flask) projects, scenarios and run assertions and manage step operations.

In order to properly manage your services project, your services must be TestFlask ready. For further explanations to prepare your service, examine [TestFlask](https://github.com/FatihSahin/test-flask) project.

## How to run an instance of TestFlask Manager

*   Go to project root folder and run
    ```
    $ npm install
    ```
*   After installing npm packages, start dev server through Angular CLI

    ```
    $ ng serve
    ```

*   You can configure TestFlask API url inside appSettings/appSettings.ts file
    ```typescript
    export class AppSettings {
        public static API_ENDPOINT='http://localhost:12079/api/';
    }
    ```

*   By default, you can access TestFlask Manager from http://localhost:4200

 ## Things that you can do with TestFlask Manager

 1. Manage TestFlask projects, scenarios and steps (create, remove, update).
 2. Delve into your recorded steps, see all sub steps, call hierarchy, requests and responses. 
 3. Manipulate your responses from these calls and make them mockable and replayable.
 4. Create expected assertion results, run assertions for the step and for whole scenario.

 For more details on TestFlask Manager, see [Wiki](https://github.com/FatihSahin/test-flask-web/wiki).

 For a sample application that uses TestFlask, see [Movie Rental Sample App](https://github.com/FatihSahin/test-flask-sample).




