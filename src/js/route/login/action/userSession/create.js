'use strict';

import rx from 'rx';

// Streams
import currentRouterStream from 'dashboard/stream/router/current';
import userManagementServiceConfig from 'dashboard/stream/configuration/userManagementService';

import persistence from 'dashboard/storage/sessionStorage';


export default function (userSessionData) {

    return rx.Observable.return(userSessionData)
        .combineLatest(
            userManagementServiceConfig,
            function (formData, serviceConfig) {
                return {
                    ...formData,
                    serviceConfig
                };
            }
        )
        .flatMapLatest(({ email, password, serviceConfig }) => {

            // Authenticate username and password against user service
            const url = `${serviceConfig.protocol}://${serviceConfig.hostname}:${serviceConfig.port}/userSession`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }) 
            }

            const promise = fetch(url, params);


            return rx.Observable.fromPromise(promise);

        })

        .flatMapLatest((resp) => {
            return resp.json()
                .then(function (json) {
                    return { json, resp }
                });
        })

        .map(function ({ json, resp }) {
            if (resp.status !== 200) {
                throw new Error(json.message)
            }

            return json;
        })

}