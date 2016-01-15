'use strict';

const rx = require('rx');
const mustache = require('mustache');
const queryAllPricingTiers = require('./../queries/pricingTiers/allPricingTiers');
const queryLoadFile = require('./../queries/file/loadFile');

module.exports = function (req) {
    return queryAllPricingTiers().map((pricingTiers) => {
        return {
            pricingTiers: pricingTiers.data.map((data) => {
                return data.attributes
            })
        };
    })
    .flatMapLatest((data) => {
        return queryLoadFile(`${__dirname}/../../html/register.html`)
            .map((contents) => {
                return {
                    header: {
                        title: 'Register'
                    },
                    body: {
                        bodyClassHook: 'page-register',
                        contents: mustache.render(contents, data)
                    }
                };
            });
    })
};
