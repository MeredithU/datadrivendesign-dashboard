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
        urlConfig.pathname = path;

        return requestUrl(urlConfig, params);
    });

};