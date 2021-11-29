// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://barberweb.herokuapp.com',
    firebaseConfig: {
        apiKey: 'AIzaSyCsGMfeYctpbBn30HbxxkplEVF16OqZU3Y',
        authDomain: 'barber-web-1eefd.firebaseapp.com',
        projectId: 'barber-web-1eefd',
        storageBucket: 'barber-web-1eefd.appspot.com',
        messagingSenderId: '459600388979',
        appId: '1:459600388979:web:54e8885dcea25c1d6cdb06',
        measurementId: 'G-ZZHLKKG1RR',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
