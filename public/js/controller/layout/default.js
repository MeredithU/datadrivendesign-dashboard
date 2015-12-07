'use strict';

import React from 'react';
import rx from 'rx';

// Client
import requestAbTest from 'dashboard/action/requestAbTest';

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
            return currentUserStream
                .map((user) => {
                    return { user, userSession }
                });
        })
        .map(({ user, userSession }) => {

            function onLogoutClick (e) {
                e.preventDefault();
                const userSessionToken = userSession._id;
                const userId = user.get('_id');

                requestAbTest('/userSession', {
                    method: 'delete',
                    headers: {
                        authentication: `token ${userId}:${userSessionToken}`
                    }
                })
                .subscribe(
                    function (resp) {
                        console.log('success');
                    },
                    function (err) {
                        console.log('error');
                    }
                );


            }

            return {
                user,
                page,
                onLogoutClick
            }
        })
        .map((props) => {
            return defaultLayout({
                ...props
            });
        })
        

    return rx.Observable.merge(noLayoutStream, layoutStream);


}