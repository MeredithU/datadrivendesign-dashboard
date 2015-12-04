'use strict';

import rx from 'rx';

import requestAbTest from 'dashboard/action/requestAbTest';

// Stream
import currentUserStream from 'dashboard/stream/user/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

export default function (abtest, groups) {

    const observable = rx.Observable.combineLatest(
            currentUserStream,
            currentUserSessionStream,
            function (user, userSession) {
                return { user, userSession };
            }

        ).flatMapLatest(({ user, userSession }) => {

            const body = abtest.asJSON();
            body.groups = groups.map(function (group) {
                return group.asJSON();
            });

            return requestAbTest(`/users/${user.get('_id')}/abtests`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'x-auth-token': userSession.id
                }
            });

        })
        .replay(undefined, 1);

    observable.connect();

    return observable;

}