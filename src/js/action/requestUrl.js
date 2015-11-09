'use strict';

import rx from 'rx';

export default function (urlConfig, params = {}) {
    const url = `${urlConfig.protocol}://${urlConfig.hostname}:${urlConfig.port}${urlConfig.pathname}`;
    
    if (!params.headers) {
        params.headers = {};
    }

    if (!params.headers['Content-Type']) {
        params.headers['Content-Type'] = 'application/json';
    }

    if (!params.headers['Accept']) {
        params.headers['Accept'] = 'application/json';
    }

    const promise = fetch(url, params);

    return rx.Observable.fromPromise(promise)
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
        });


}