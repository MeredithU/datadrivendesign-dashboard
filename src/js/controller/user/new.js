'use strict';

import rx from 'rx';
import React from 'react';

// Action
import requestAbTest from 'dashboard/action/requestAbTest';

// Model
import User from 'dashboard/model/user';

// View
import NewUserView from 'dashboard/view/user/new';

export default function (req) {

    return rx.Observable.create(function (o) {
        const user = User.create();

        function next () {
            o.onNext({
                user,
                onRegisterFormSubmit,
                onUsernameChange,
                onPasswordChange,
                onConfirmChange
            });
        }

        function onRegisterFormSubmit () {
            const userJson = user.asJSON(); 
            
            requestAbTest('/users', {
                method: 'post',
                body: JSON.stringify(userJson)
            });
        }

        function onUsernameChange (e) {
            user.set('username', e.target.value);
            next();
        }

        function onPasswordChange (e) {
            user.set('password', e.target.value);
            next();
        }

        function onConfirmChange (e) {
            user.set('confirm', e.target.value);
            next();
        }

        next();

    })

    .map((props) => {
        return (
            <NewUserView {...props} />
        );
    })

}