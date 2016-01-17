'use strict';

import rx from 'rx';
import React from 'react';

import queryAllPricingTiers from 'turissini/queries/pricingTier/allPricingTiers';

export default function (req) {
    return queryAllPricingTiers()
        .toArray()
        .map((pricingTiers) => {
            return pricingTiers.map((tier, index) => {
                const key = `tier-${index}`;
                console.log(tier.get('label'));
                console.log('ok', tier);
                return (
                    <div key={key}>{tier.get('label')}</div>
                )
            })
        });
};
