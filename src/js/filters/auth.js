'use strict';

// Stream
import currentUserSessionStream from 'dashboard/stream/userSession/current';
import currentRouterStream from 'dashboard/stream/router/current';

export default function (next) {

    const stream = currentUserSessionStream.first()
        .map((userSession) => {

            if (!userSession) {
                throw new Error('Invalid session');
            }

            return userSession;

        }).subscribe(
            function () {
                next();
            },

            function () {
                currentRouterStream.subscribe((router) => {
                    next(false);
                    router.setRoute('/login');
                });
            }
        );

};
