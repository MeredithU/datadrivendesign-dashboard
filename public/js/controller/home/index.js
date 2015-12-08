'use strict';

import rx from 'rx';

// Streams
import currentAbtestsStream from 'dashboard/stream/abtests/current';
import currentRouterStream from 'dashboard/stream/router/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Views
import indexView from 'dashboard/view/home/index';

export let __hotReload = true;
export default function (route) {

    return currentRouterStream.flatMapLatest((router) => {

        const createAbTestHref = router.makeCreateAbTestHref();
        return currentAbtestsStream.map((abtests) => {
                return { abtests, createAbTestHref };
            })

    })

    .map((props) => {
        return indexView(props);
    })

}