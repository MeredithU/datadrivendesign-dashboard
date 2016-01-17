'use strict';

import rx from 'rx';

import appRouterStream from 'turissini/stream/router/current';

export default function (routerStream = appRouterStream) {
    return routerStream.first().flatMapLatest((router) => {

        return rx.Observable.create(function (o) {
            const links = [{
                text: 'Your A/B Tests',
                href: router.makeHomeHref(),
                icon: 'signal',
                context: 'abtests'
            }, {
                text: 'Documentation',
                href: router.makeDocumentationHref(),
                icon: 'file',
                context: 'documentation'
            }, {
                text: 'Billing',
                href: router.makeBillingHref(),
                icon: 'piggy-bank',
                context: 'billing'
            }, {
                text: 'API',
                href: router.makeAPIHref(),
                icon: 'cloud',
                context: 'api'
            }];

            links.map(function (link) {
                const m = new Map();

                Object.keys(link).forEach(function (key) {
                    m.set(key, link[key]);
                });

                return m;
            })
            .forEach(o.onNext, o);

            o.onCompleted();

        });
    });
}
