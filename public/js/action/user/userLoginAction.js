'use strict';

import rx from 'rx';
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (loginModel) {
    const params = {
        username: loginModel.get('username'),
        password: loginModel.get('password')
    };

    return rx.Observable.create(function (o) {

        o.onNext({
            message: 'Logging in',
            data: null
        });

        const requestStream = requestAbTest('/usersessions', {
            method: 'POST',
            body: JSON.stringify(params)
        });

        requestStream.subscribe(
            function (resp) {
                o.onNext({
                    message: 'Logged in',
                    data: resp
                });
            },
            o.onError.bind(o),
            o.onCompleted.bind(o)
        );
    })

}
