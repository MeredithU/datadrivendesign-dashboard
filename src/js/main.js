'use strict';

// External
import React from 'react';
import ReactDom from 'react-dom';
import rx from 'rx';

// Streams
import currentRouterStream from 'dashboard/stream/router/current';
import containerStream from 'dashboard/stream/element/container';
import routeChangeStream from 'dashboard/stream/router/routeChange';


// Views
import Root from 'dashboard/view/Root';

routeChangeStream.flatMapLatest((route) => {

        const promise = System.import(route.modulePath);

        return rx.Observable.fromPromise(promise)
            .flatMapLatest((observable) => {
                return observable.default(route);
            });
            

    }).combineLatest(
        containerStream,
        function (page, element) {
            return { page, element }
        }
    )
    .subscribe(({ page, element }) => {
        ReactDom.render(<Root page={page} />, element);
    });

currentRouterStream.subscribe((router) => {
    router.init('/');
});
currentRouterStream.connect();