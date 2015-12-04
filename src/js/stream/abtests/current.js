'use strict';

import rx from 'rx';
import _ from 'lodash';

// Stream
import abtestServiceConfigStream from 'dashboard/stream/configuration/abtestService';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Action
import requestAbTest from 'dashboard/action/requestAbTest';


export default currentUserSessionStream
    .flatMapLatest((userSession) => {
        const path = `/users/${userSession.user_id}/abtests`;

        console.log(path);
        return requestAbTest(path, {
            method: 'get'
        });
    })

    .startWith(null);