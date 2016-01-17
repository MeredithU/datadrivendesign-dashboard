'use strict';

import React from 'react';
import rx from 'rx';
import jquery from 'jquery';
import abtestClient from 'turissini/client/abtestService';
import registerUserAction from 'turissini/action/user/userRegisterAction';
import userLoginAndRedirectAction from 'turissini/action/user/userLoginAndRedirectAction';

const registerForm = jquery('#register-form');
const formErrors = jquery('#form-errors');

function hideError () {
    formErrors.html();
}

function showError (err) {
    formErrors.html(`
        <div class="alert alert-danger">
            ${err.message}
        </div>
    `);
}

registerForm.submit(function (e) {
    e.preventDefault();
    hideError();

    const username = jQuery('#email-input').val();
    const password = jQuery('#password-input').val();
    const confirm = jQuery('#confirm-input').val();
    const userData = new Map();
    userData.set('username', username);
    userData.set('password', password);
    userData.set('confirm', confirm);


    const pricingTierId = registerForm.find('[name=pricing]:checked').val()
    const pricingTier = new Map();
    pricingTier.set('id', pricingTierId);

    rx.Observable.create(function (o) {
        registerUserAction(userData, pricingTier)
            .subscribe(function (message) {
                o.onNext(message);

            }, function (err) {
                o.onError(err);
            }, function () {

                userLoginAndRedirectAction(userData)
                    .subscribe((message) => {
                        o.onNext(message);
                    }, function (err) {
                        o.onError(err);
                    },
                    function () {
                        o.onCompleted();
                    })

            })
    })
    .subscribe(function (message) {
        console.log(message);
    }, showError);


});
