'use strict';

import rx from 'rx';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Request
import createGetAbTestRequest from 'dashboard/request/user/getAbTest';

// Responses
import abtestShowResponse from 'dashboard/responses/abtest/show';

export default function (userStream, userSessionStream, abtestId) {

    return userStream.combineLatest(
        userSessionStream,
        function (user, userSession) {
            return createGetAbTestRequest(user, userSession, abtestId);
        }
    )
    .flatMapLatest((request) => {
        return abtestServiceClient.send(request);
    })

    .flatMapLatest((resp) => {
        return abtestShowResponse(resp);
    })
    .shareReplay(1);

};
