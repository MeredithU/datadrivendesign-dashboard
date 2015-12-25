'use strict';

import rx from 'rx';

// Storage
import persistence from 'dashboard/storage/sessionStorage';

// Model
import UserSession from 'dashboard/model/userSession';

// Streams
import currentRouterStream from 'dashboard/stream/router/current';

// Action
import requestAbTest from 'dashboard/action/requestAbTest';

// Views
import indexLoginView from 'dashboard/view/login/index';


export default function (route) {

    return rx.Observable.create(function (o) {

        function next () {
            o.onNext(viewData);
        }

        function onSubmit () {
            viewData.errors = [];
            next();

            const body = JSON.stringify({
                username: viewData.email,
                password: viewData.password
            });

            requestAbTest('/userSession', {
                method: 'post',
                body
            })
            .subscribe((resp) => {

                const userSession = UserSession.create({
                    id: resp.data.id,
                    user_id: resp.data.relationships.user.id
                });

                persistence.save('user-session', userSession.asJSON());
                window.location.hash = '#/';
            })
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
            registerHref:'#/register',
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
