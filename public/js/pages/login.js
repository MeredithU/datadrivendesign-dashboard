'use strict';

import jquery from 'jquery';

import userLoginAndRedirectAction from 'turissini/action/user/userLoginAndRedirectAction';

const loginForm = jquery('#login-form');


loginForm.submit(function (e) {
    e.preventDefault();

    const username = jQuery('#email-input').val();
    const password = jQuery('#password-input').val();

    const user = new Map();
    user.set('username', username);
    user.set('password', password);

    userLoginAndRedirectAction(user)
        .subscribe(function (n) {
            console.log('next', n);
        })

});
