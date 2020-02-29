// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/* local env */
const protocol = 'http';
const host = 'grantsportal.rejoicehub.com';
const port = '';
const trailUrl = 'api/v1';

const webHost = 'http://localhost:4200/';

/* Live env */
// const protocol = 'http';
// const host = 'dotnetapi.tk';
// const port = '';
// const trailUrl = 'api';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}`;
const endpoint = `${hostUrl}${trailUrl ? '/' + trailUrl : ''}`;

export const ENVIRONMENT = {
  production: false,
  API: {
    protocol,
    host,
    port,
    trailUrl,
    hostUrl,
    webHost
  },
  API_ENDPOINT: endpoint,
  TEMP_URL: hostUrl
};

export interface APIOptions {
  protocol: string;
  host: string;
  port: string;
  trailUrl: string;
  hostUrl: string;
  webHost: string;
}

export const firebaseConfig = {
  apiKey: "AIzaSyBd8SxIrn4VBHIOOYI8yxPNlMhHczJkM0Q",
  authDomain: "grants-platform.firebaseapp.com",
  databaseURL: "https://grants-platform.firebaseio.com",
  storageBucket: "grants-platform.appspot.com",
  projectId: "grants-platform",
}

export const ethersConfig = {
  networks: 'ropsten',
  apiToken: "6KK5NG3BDH1QEVDE2WIMQA7AD3J691QHBV",
  privateKey: "3AA47101BEFF0ED6AAFE7B3D7EA45274EB036B7FC578E2424238A7A46A9EBAE3",
  contractAddress: "0x55A494C5cdf6CcD1eF0C76439CA3D19221C5432a",
  rpcURL: "https://ropsten.infura.io/v3/56a56ec009b34e31b6aeb4eb817f0772"
}

// export const ethersConfig = {
//   networks: 'ropsten',
//   apiToken: "6KK5NG3BDH1QEVDE2WIMQA7AD3J691QHBV",
//   contractAddress: "0x64F701198216f94A421565D90Fed78856D2b8245"
// }
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
