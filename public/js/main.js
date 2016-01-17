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
import currentUserSessionStream from 'turissini/stream/userSession/current';
import currentUserStream from 'turissini/stream/user/current';

// View Controller
import appNavViewController from 'turissini/viewController/nav/appNav';


// Actions
import userLogoutAction from 'turissini/action/user/userLogoutAction';

import HeaderNav from 'turissini/component/header/nav';

import Root from 'dashboard/view/Root';

currentUserSessionStream
    .filter((userSession) => {
        return userSession;
    })

    .subscribe((userSession) => {

        const div = document.getElementById('site-navbar-collapse');

        currentUserStream.map((user) => {

            const props = {
                user
            };

            props.onLogoutClick = function () {
                userLogoutAction(userSession, user)
                    .subscribeOnCompleted(function () {
                        window.sessionStorage.clear();
                        window.location.href = '/';
                    });
            };

            props.userApiKeysHref = '#/api-keys';
            props.pricingHref = '#/pricing';

            return props;

        })
        .map((props) => {
            return HeaderNav(props);
        })
        .subscribe((component) => {
            return ReactDom.render(<div>{component}</div>, div);
        });

        routeChangeStream.flatMapLatest((route) => {
                const module = route.module;
                return module(route);
            })
            .flatMapLatest((contents) => {
                return appNavViewController({
                    contents
                });
            })
            .combineLatest(
                containerStream,
                function (page, element) {
                    return { page, element }
                }
            )

            .subscribe(({ page, element }) => {
                ReactDom.render(<Root page={page} />, element);
            });


    });

currentUserSessionStream.connect();

currentRouterStream.subscribe((router) => {
    router.init('/');
});
currentRouterStream.connect();
