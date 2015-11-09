'use strict';

import rx from 'rx';
import persistence from 'dashboard/storage/sessionStorage';

// Streams
import currentRouterStream from 'dashboard/stream/router/current';

// Actions
import createUserSession from 'dashboard/route/login/action/userSession/create';

// Views
import indexLoginView from 'dashboard/route/login/view/index';


export default function (route) {

    return rx.Observable.create(function (o) {

        function next () {
            o.onNext(viewData);
        }

        function onSubmit () {
            viewData.errors = [];
            next();

            createUserSession(viewData).first().subscribe(
                function (userSession) {

                    currentRouterStream.subscribe((router) => {
                        persistence.save('user-session', userSession);
                        router.setRoute('/');
                        o.onCompleted();
                    });
                    
                },

                function (err) {
                    viewData.errors.push(err.message);
                    next();
                }
            );
        }

        function onPasswordChange (e) {
            viewData.password = e.target.value;
            next();
        }

        function onUsernameChange (e) {
            viewData.email = e.target.value;
            next();
        }

        const viewData = {
            email: '',
            password: '',
            onPasswordChange: onPasswordChange,
            onUsernameChange: onUsernameChange,
            onSubmit: onSubmit,
            errors: []
        };

        next();

    })

    .map((viewData) => {
        return indexLoginView(viewData);
    })

};