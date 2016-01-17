'use strict';

import rx from 'rx';

export default function () {
    return rx.Observable.create(function (o) {
        const links = [{
            text: 'Your A/B Tests',
            href: '/_/#/',
            icon: 'signal'
        }, {
            text: 'Documentation',
            href: '/documentation',
            icon: 'file'
        }, {
            text: 'Billing',
            href: '/_/#/billing',
            icon: 'piggy-bank'
        }, {
            text: 'API',
            href: '/_/#api',
            icon: 'cloud'
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
}
