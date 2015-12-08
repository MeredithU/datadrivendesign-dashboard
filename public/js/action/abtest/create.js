'use strict';

import rx from 'rx';

// Client
import abtestClient from 'dashboard/client/abtestService';

// Stream
import currentUserStream from 'dashboard/stream/user/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Request
import createAbTestRequest from 'dashboard/request/abtest/createAbTest';

export default function (abtest, abtestGroups) {

    const observable = rx.Observable.combineLatest(
            currentUserStream,
            currentUserSessionStream,
            function (user, userSession) {
                return { user, userSession };
            }

        ).flatMapLatest(({ user, userSession }) => {

            const request = createAbTestRequest(userSession, user, abtest, abtestGroups);

            return abtestClient.send(request);

        })
        .replay(undefined, 1);

    observable.connect();

    return observable;

}