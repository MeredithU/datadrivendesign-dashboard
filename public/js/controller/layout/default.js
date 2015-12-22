'use strict';

import React from 'react';
import rx from 'rx';

// Client
import abtestServiceClient from 'dashboard/client/abtestService';

// Request
import deleteUserSessionRequest from 'dashboard/request/userSession/delete';

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
                user.set('id', user.get('_id'));

                const request = deleteUserSessionRequest(userSession, user);

                abtestServiceClient.send(request)
                    .subscribe(
                        function (resp) {
                            window.sessionStorage.clear();
                            window.location.href = '/';
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
