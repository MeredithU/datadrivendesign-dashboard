'use strict';

import rx from 'rx';

// Request
import requestAllPricingTiers from 'turissini/request/pricingTier/all';

export default function (user) {
    return requestAllPricingTiers()
        .flatMapLatest((resp) => {
            return rx.Observable.create(function (o) {
                resp.data.map((pricingTierData) => {
                    const pricingTier = new Map();

                    Object.keys(pricingTierData.attributes).forEach(function (key) {
                        pricingTier.set(key, pricingTierData.attributes[key]);
                    });

                    pricingTier.set('id', pricingTierData.id);
                    o.onNext(pricingTier);

                });

                o.onCompleted();

            });
        });
};
