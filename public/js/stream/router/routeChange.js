'use strict';

import rx from 'rx';
import _ from 'lodash';

// filter
import authFilter from 'dashboard/filters/auth';

// Stream
import currentRouterStream from 'dashboard/stream/router/current';


import homeIndex from 'dashboard/controller/home/index';
import loginIndex from 'dashboard/controller/login/index';
import newAbtests from 'dashboard/controller/abtests/new';
import registerIndex from 'dashboard/controller/user/new';

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
                        module: homeIndex
                    });
                }],

                '/abtests/new': [generateFilterHandler(authFilter), function () {
                    o.onNext({
                        module: newAbtests
                    })
                }],

                '/login': function () {
                    o.onNext({
                        name: 'login',
                        module: loginIndex
                    });
                },

                '/register': function () {
                    o.onNext({
                        name: 'register',
                        module: registerIndex
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
