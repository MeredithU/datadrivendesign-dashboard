'use strict';

import rx from 'rx';
import _ from 'lodash';

// Model
import User from 'dashboard/model/user';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Requests
import userGetAbTestsRequest from 'dashboard/request/user/getAbTests';

// Responses
import abtestIndexResponse from 'dashboard/responses/abtest/index';


function factory (userSessionStream) {
    return userSessionStream.flatMapLatest((userSession) => {
            const user = User.create({
                id: userSession.get('user_id')
            });

            const request = userGetAbTestsRequest(userSession, user);
            
            return abtestServiceClient.send(request);
        })

        .flatMapLatest((resp) => {
            return abtestIndexResponse(resp).toArray();
        })
        .shareReplay(1);
}

export let createAbTestStream = factory;
export default factory(currentUserSessionStream);