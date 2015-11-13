'use strict';

import rx from 'rx';

// Action
import requestUserManagement from 'dashboard/action/requestUserManagement';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';


const observable = currentUserSessionStream.filter((userSession) => {
        return userSession
    })
    .distinctUntilChanged(function (userSession) {
        return userSession.id
    })
    .flatMapLatest((userSession) => {

        return requestUserManagement(`/users/${userSession.user_id}`, {
            headers: {
                'x-auth-token': userSession.id
            }
        });
        
    }).replay(undefined, 1);

observable.connect();


export default observable;