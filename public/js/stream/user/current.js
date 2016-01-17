'use strict';

import rx from 'rx';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Model
import User from 'dashboard/model/user';

// Queries
import queryUserById from 'turissini/queries/user/getUserById';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Request
import getUserRequest from 'dashboard/request/user/get';

import sessionStorageStream from 'dashboard/storage/sessionStorage';

function createCurrentUserStream (userSessionStream) {
    return userSessionStream.filter((userSession) => {
            return userSession;
        })
        .distinctUntilChanged(function (userSession) {
            return userSession.get('id')
        })
        .flatMapLatest((userSession) => {
            return sessionStorageStream.map((sessionStorage) => {
                return sessionStorage.getItem('user-id');
            })
            .flatMapLatest((userId) => {
                return queryUserById(userId);
            })
        })
        .shareReplay(1);
}


export { createCurrentUserStream };
export default createCurrentUserStream(currentUserSessionStream);
