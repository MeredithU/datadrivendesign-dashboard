'use strict';

import rx from 'rx';
import React from 'react';
import numeral from 'numeral';

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
                const inputId = `checkbox-${pricingTier.get('label')}-pricing`;
                const price = pricingTier.get('price_per_unit');
                let priceStr = price;

                if (price === 0) {
                    priceStr = (
                        <span>
                            Free <small></small>
                        </span>
                    )
                } else {
                    const num = numeral(price).format('$0,0.00');
                    priceStr = (
                        <span>
                            {num} <small>per 1,000 Impressions</small>
                        </span>
                    )
                }

                function onInputChange () {
                    onUserPricingTierChange(pricingTier);
                }


                return (
                    <div className="col-xs-12 col-xs-6" key={key}>
                        <input id={inputId} className="hide" onChange={onInputChange} type="radio" checked={isUserPricingTier} />
                        <section className="text-center pricing-tier-summary label-box box-wire">
                            <label htmlFor={inputId}></label>
                            <h4 className="price-pricing-tier text-capitalize">{pricingTier.get('label')}</h4>
                            <h3 className="title-pricing-tier">{priceStr}</h3>
                        </section>
                    </div>
                );
            })
            .toArray()
            .map((components) => {
                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h3>Current charges: $0.00</h3>
                            </div>
                        </div>
                        <hr />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12">
                                    <h4>
                                        Change your Billing Plan
                                    </h4>
                                </div>
                            </div>
                            <Form onSubmit={onSubmit}>
                                <div className="row pricing-tiers-row">
                                    {components}
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-xs-12 text-center">
                                        <input className="btn btn-primary" type="submit" value="Update Billing Plan" />
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                )
            })
    });
};
