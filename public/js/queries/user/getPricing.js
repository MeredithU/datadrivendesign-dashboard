'use strict';

import rx from 'rx';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Model
import User from 'dashboard/model/user';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Request
import getUserRequest from 'dashboard/request/user/get';

function queryUserById (user) {
    return getUserRequest(user)
        .map((resp) => {
            const apiKeyAttributes = resp.data.relationships.apikey;
            const apiKey = new Map();
            console.log(resp);

            apiKey.set('id', apiKeyAttributes.id);

            return apiKey;
        });
}


export default queryUserById;
