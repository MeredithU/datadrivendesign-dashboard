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


function createCurrentUserStream (userSessionStream) {
    return userSessionStream.filter((userSession) => {
            return userSession
        })
        .distinctUntilChanged(function (userSession) {
            return userSession.id
        })
        .flatMapLatest((userSession) => {
            const user = User.create({
                id: userSession.get('user_id')
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