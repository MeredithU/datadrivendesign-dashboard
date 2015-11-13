'use strict';

import rx from 'rx';
import _ from 'lodash';

// filter
import authFilter from 'dashboard/filters/auth';

// Stream
import currentRouterStream from 'dashboard/stream/router/current';


const currentRouteStream = currentRouterStream.flatMapLatest((router) => {

        function generateFilterHandler (filter) {
            return function () {
                const next = _.last(arguments);
                return filter(next);
            }
        }

        return rx.Observable.create(function (o) {
            router.mount({
                '/': [generateFilterHandler(authFilter), function (a) {
                    o.onNext({
                        modulePath: 'dashboard/controller/home/index'
                    });
                }],

                '/abtests/new': [generateFilterHandler(authFilter), function () {
                    o.onNext({
                        modulePath: 'dashboard/controller/abtests/new'
                    })
                }],
                
                '/login': function () {
                    o.onNext({
                        name: 'login',
                        modulePath: 'dashboard/controller/login/index'
                    });
                }
            });

        });

    })
    .map((request) => {
        if (!request.params) {
            request.params = {};
        }

        return request;
    })
    .replay(undefined, 1);

currentRouteStream.connect();


export default currentRouteStream;