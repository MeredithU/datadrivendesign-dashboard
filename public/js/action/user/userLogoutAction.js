'use strict';

import rx from 'rx';
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (userSession, user) {
    return rx.Observable.create(function (o) {

        o.onNext({
            message: 'Logging out',
            data: null
        });

        requestAbTest('/usersessions', {
            method: 'delete',
            headers: {
                authentication: `token ${user.get('id')}:${userSession.get('id')}`
            }
        })
        .subscribe(
            function (resp) {
                o.onNext({
                    message: 'User Logged Out',
                    data: resp
                });
            },
            o.onError.bind(o),
            o.onCompleted.bind(o)
        );
    });
};
