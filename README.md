### SFDC-OPS-DATA-UPLOADER
A web application to upload csv files, consume it and display it in a user friendly manner then triger a push sales-force platform.

#### Changing environment
You can change the environment you authenticate with and upload using the steps below:

- Follow the wizard steps till the `Authenticate` screen
- In the Refresh Token field enter the value `##dev` or `##stg` and press `Change Environment`
- Enter the correct refresh token based on the selected environment and click `Authenticate`
- Click `Next` and continue to Upload as usual

In order to reset bcak to production, click on `Reset` on the Authenticate screen or type `##prd` to Change Environment.

Following URLs are used for each environment:

  - `##dev` -> `https://deveron--devsandbox.sandbox.my.site.com/clients`
  - `##stg` -> `https://stage-clients.deveronapp.com`
  - `##prd` -> `https://clients.deveronapp.com`

#### Steps to follow
- Clone the repo
- In terminal run `yarn install`
- Run `yarn start`
#### Code Structure
`Components` folder contains custom resuable components
`Pages` are built according to the design / features, and project specidifc components reside theres

#### Dependencies
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [React Redux](https://react-redux.js.org/introduction/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Geolib](https://www.npmjs.com/package/geolib)
- [Papaparse](https://www.npmjs.com/package/papaparse)
- [Ant Design](https://ant.design/docs/react/introduce)
- [Classnames](https://www.npmjs.com/package/classnames)
- [Axios](https://www.npmjs.com/package/axios)
