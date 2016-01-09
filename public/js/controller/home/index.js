'use strict';

import rx from 'rx';

// Streams
import currentAbtestsStream from 'dashboard/stream/abtests/current';
import currentRouterStream from 'dashboard/stream/router/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';
import currentUserStream from 'dashboard/stream/user/current';

// Views
import indexView from 'dashboard/view/home/index';

export let __hotReload = true;
export default function (route) {

    return currentRouterStream.flatMapLatest((router) => {

        const createAbTestHref = router.makeCreateAbTestHref();
        return currentAbtestsStream.combineLatest(
            currentUserStream,
            function (abtests, user) {
                return { abtests, user }
            }
        )
        .map(({ abtests, user }) => {
            abtests.forEach(function (abtest) {
                abtest.abtest.href = router.makeShowAbTestHref(abtest.abtest);
            });
            return { abtests, createAbTestHref, user };
        })

    })

    .map((props) => {
        return indexView(props);
    })

}
