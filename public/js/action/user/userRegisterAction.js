'use strict';

import rx from 'rx';
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (user, pricingTier) {
    const userAttributes = {
        username: user.get('username'),
        password: user.get('password'),
        confirm: user.get('confirm')
    };

    const body = {
        data: {
            type: 'user',
            attributes: userAttributes,
            relationships: {
                pricingTier: {
                    type: 'pricingtier',
                    id: pricingTier.get('id')
                }
            }
        }
    };

    return rx.Observable.create(function (o) {
        o.onNext({
            message: 'Creating User',
            data: null
        });

        const requestObservable = requestAbTest('/users', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        requestObservable.subscribe(
            function (resp) {
                o.onNext({
                    message: 'User Created',
                    data: resp
                });
            },
            o.onError.bind(o),
            o.onCompleted.bind(o)
        );

    });


}
