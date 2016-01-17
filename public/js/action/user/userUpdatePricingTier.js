'use strict';

import rx from 'rx';
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (user, pricingTier) {
    return rx.Observable.create(function (o) {
        o.onNext({
            message: 'Updating',
            data: null
        });

        const body = {
            data: {
                relationships: {
                    pricingTier: {
                        type: 'pricingtier',
                        id: pricingTier.get('id')
                    }
                }
            }
        };

        console.log(body);

        const params = {
            method: 'PUT',
            body: JSON.stringify(body)
        };

        requestAbTest(`/users/${user.get('id')}`, params)
            .subscribe(function (resp) {
                o.onNext({
                    message: 'Successfully updated',
                    data: resp
                });
            },
            o.onError.bind(o),
            o.onCompleted.bind(o)
        )

    });
}
