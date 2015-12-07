'use strict';

// Polyfill
import fetchPolyfill from 'whatwg-fetch';

// External
import React from 'react';
import ReactDom from 'react-dom';
import rx from 'rx';

// Streams
import currentRouterStream from 'dashboard/stream/router/current';
import containerStream from 'dashboard/stream/element/container';
import routeChangeStream from 'dashboard/stream/router/routeChange';


// Controller
import layoutController from 'dashboard/controller/layout/default'; 
import Root from 'dashboard/view/Root';

routeChangeStream.flatMapLatest((route) => {

        const module = route.module;
        return module(route)
            .flatMapLatest((page) => {
                return layoutController(route, page);
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