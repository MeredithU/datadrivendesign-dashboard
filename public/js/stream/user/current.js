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

function createCurrentUserStream (userSessionStream) {
    return userSessionStream.filter((userSession) => {
            return userSession;
        })
        .distinctUntilChanged(function (userSession) {
            return userSession.get('id')
        })
        .combineLatest(
            sessionStorage,
            function (userSession, sessionStorage) {
                const userId = sessionStorage.getItem('user-id');
                return { userSession, userId };
            }
        )
        .flatMapLatest(({ userSession, userId }) => {
            const user = User.create({
                id: userId
            });

            const request = getUserRequest(user);

            return abtestServiceClient.send(request);
            
        })
        .flatMapLatest((resp) => {
            return rx.Observable.create(function (o) {
                if (resp.error) {
                    o.onError(resp.error);
                    return
                }

                const user = User.create(resp.data);

                o.onNext(user);
                o.onCompleted();
            });
        })
        .shareReplay(1);
}


export { createCurrentUserStream };
export default createCurrentUserStream(currentUserSessionStream);