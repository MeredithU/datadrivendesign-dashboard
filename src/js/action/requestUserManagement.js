'use strict';

import rx from 'rx';
import _ from 'lodash';


// Action
import requestUrl from 'dashboard/action/requestUrl';

// Stream
import userManagementServiceConfigStream from 'dashboard/stream/configuration/userManagementService';


export default function (path, params = {}) {

    return userManagementServiceConfigStream.flatMapLatest((config) => {
        const urlConfig = _.clone(config);
        urlConfig.pathname = path;

        return requestUrl(urlConfig, params);
    });

};