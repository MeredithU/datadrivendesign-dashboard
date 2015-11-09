'use strict';

import rx from 'rx';

// Stream
import currentRouterStream from 'dashboard/stream/router/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';


const currentRouteStream = currentRouterStream.flatMapLatest((router) => {

        return rx.Observable.create(function (o) {
            router.mount({
                '': {
                    on: function (next) {

                        currentUserSessionStream.first().subscribe((userSession) => {
                            if (userSession === null) {
                                router.setRoute('/login');
                                next(false);
                            }

                            next();

                        });
                        
                    },

                    '/': function (a) {
                        o.onNext({
                            modulePath: 'dashboard/route/home/controller/index'
                        });
                    }
                },
                
                '/login': function () {
                    o.onNext({
                        modulePath: 'dashboard/route/login/controller/index'
                    });
                }
            });

        });

    })
    .map((route) => {
        if (!route.params) {
            route.params = {};
        }

        return route;
    })
    .replay(undefined, 1);

currentRouteStream.connect();


export default currentRouteStream;