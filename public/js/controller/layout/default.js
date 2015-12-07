'use strict';

import React from 'react';
import rx from 'rx';


// Stream
import currentUserStream from 'dashboard/stream/user/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Component
import defaultLayout from 'dashboard/component/layout/default';

export default function (route, page) {

    const noLayoutStream = currentUserSessionStream.filter((userSession) => {
            return !userSession;
        }).map(() => {
            return page;

        })

    const layoutStream = currentUserSessionStream.filter((userSession) => {
            return userSession;
        })
        .flatMapLatest((userSession) => {
            return currentUserStream;
        })
        .map((user) => {
            return defaultLayout({ user, page });
        });
        

    return rx.Observable.merge(noLayoutStream, layoutStream);


}