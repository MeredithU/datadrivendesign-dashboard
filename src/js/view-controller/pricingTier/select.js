'use strict';

const rx = require('rx');
const _ = require('lodash');
const numeral = require('numeral');
const mustache = require('mustache');

const queryLoadPartial = require('./../../queries/file/loadPartial');

module.exports = function (pricingTiersStream) {
    return pricingTiersStream.reduce((seed, pricingTier) => {
        seed.pricingTier[pricingTier.get('name')] = pricingTier.id;

        return seed;
    }, {
        pricingTier:{}
    })
    .flatMapLatest((props) => {
        return queryLoadPartial('pricingTier/select.html')
            .map((contents) => {
                return mustache.render(contents, props);
            });
    });
};
