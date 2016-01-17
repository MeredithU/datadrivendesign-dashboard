'use strict';

import rx from 'rx';
import _ from 'lodash';


import requestUrl from 'dashboard/action/requestUrl';

// Action
import createAbTest from 'dashboard/action/abtest/create';

// Stream
import abTestServiceConfigStream from 'dashboard/stream/configuration/abtestService';


export default function (path, params = {}) {

    return abTestServiceConfigStream.flatMapLatest((config) => {

        const urlConfig = _.clone(config);
	    const basePath = config.basePath || '';
        urlConfig.pathname = basePath + path;

        return requestUrl(urlConfig, params);
    })
    .flatMapLatest((resp) => {
        return rx.Observable.create(function (o) {
            if (resp.error) {
                o.onError(resp.error);
            }

            o.onNext(resp);
            o.onCompleted();
        });
    });

};
