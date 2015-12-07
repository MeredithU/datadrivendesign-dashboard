'use strict';

import rx from 'rx';
import _ from 'lodash';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Action
import requestAbTest from 'dashboard/action/requestAbTest';

// Responses
import abtestIndexResponse from 'dashboard/responses/abtest/index';


function factory (userSessionStream) {
    return userSessionStream.flatMapLatest((userSession) => {
            const path = `/users/${userSession.user_id}/abtests`;

            return requestAbTest(path, {
                method: 'get',
                headers: {
                    authentication:`token ${userSession.user_id}:${userSession._id}`
                }
            });
        })

        .flatMapLatest((resp) => {
            return abtestIndexResponse(resp).toArray();
        })
        .shareReplay(1);
}

export let createAbTestStream = factory;
export default factory(currentUserSessionStream);