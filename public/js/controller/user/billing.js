'use strict';

import rx from 'rx';
import React from 'react';

import queryAllPricingTiers from 'turissini/queries/pricingTier/allPricingTiers';
import queryUserPricingTier from 'turissini/queries/user/getPricing';
import currentUserStream from 'turissini/stream/user/current';

// Action
import userUpdatePricingTier from 'turissini/action/user/userUpdatePricingTier';

// Component
import Form from 'turissini/component/form/Form';

export default function (req) {
    return currentUserStream.first().flatMapLatest((user) => {
        return queryUserPricingTier(user).first()
            .flatMapLatest((userPricingTier) => {
                let pricingTier = userPricingTier;

                return rx.Observable.create(function (o) {

                    function sendNext() {
                        o.onNext({
                            userPricingTier: pricingTier,
                            onUserPricingTierChange,
                            onSubmit
                        })
                    }

                    function onSubmit () {
                        userUpdatePricingTier(user, pricingTier)
                            .subscribe((m) => {
                                console.log(m);
                            });
                    }

                    function onUserPricingTierChange (updatedPricingTier) {
                        pricingTier = updatedPricingTier;
                        sendNext();
                    }

                    sendNext();

                });

            })
    })
    .flatMapLatest(({ onSubmit, userPricingTier, onUserPricingTierChange }) => {
        return queryAllPricingTiers()
            .map((pricingTier, index) => {
                const key = `tier-${index}`;
                const isUserPricingTier = (userPricingTier.get('id') === pricingTier.get('id'));

                return (
                    <div key={key}>
                        <input onChange={function () {
                            onUserPricingTierChange(pricingTier);
                        }} type="radio" checked={isUserPricingTier} />
                        {pricingTier.get('label')}
                    </div>
                );
            })
            .toArray()
            .map((components) => {
                return (
                    <Form onSubmit={onSubmit}>
                        {components}
                        <input className="btn btn-primary" type="submit" value="Update" />
                    </Form>
                )
            })
    });
};
