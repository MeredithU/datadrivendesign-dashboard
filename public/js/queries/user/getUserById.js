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

import sessionStorage from 'dashboard/storage/sessionStorage';

function queryUserById (userId) {
    const user = User.create({
        id: userId
    });

    return getUserRequest(user)
        .map((resp) => {
            const user = User.create(resp.data.attributes);
            user.set('id', resp.data.id);

            return user;
        });
}


export default queryUserById;
