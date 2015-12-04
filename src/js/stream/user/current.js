'use strict';

import rx from 'rx';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Model
import User from 'dashboard/model/user';

// Action
import requestAbTest from 'dashboard/action/requestAbTest';


function createCurrentUserStream (userSessionStream) {
    return userSessionStream.filter((userSession) => {
            return userSession
        })
        .distinctUntilChanged(function (userSession) {
            return userSession.id
        })
        .flatMapLatest((userSession) => {

            return requestAbTest(`/users/${userSession.user_id}`);
            
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
        .replay(undefined, 1)
        .refCount();
}


export { createCurrentUserStream };
export default createCurrentUserStream(currentUserSessionStream);