'use strict';

import rx from 'rx';

import requestAbTest from 'dashboard/action/requestAbTest';

// Stream
import currentUserStream from 'dashboard/stream/user/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

export default function (abtest) {

    const observable = rx.Observable.combineLatest(
            currentUserStream,
            currentUserSessionStream,
            function (user, userSession) {
                return { user, userSession };
            }

        ).flatMapLatest(({ user, userSession }) => {

            return requestAbTest(`/users/${user.id}/abtests`, {
                method: 'POST',
                body: JSON.stringify(abtest.asJSON()),
                headers: {
                    'x-auth-token': userSession.id
                }
            });

        })
        .replay(undefined, 1);

    observable.connect();

    return observable;

}