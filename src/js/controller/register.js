'use strict';

const rx = require('rx');
const queryAllPricingTiers = require('./../queries/pricingTiers/allPricingTiers');
const queryLoadFile = require('./../queries/file/loadFile');

const mustache = require('mustache');
const comparePricingTierViewController = require('./../view-controller/pricingTier/select');

module.exports = function (req) {
    const pricingTiersStream = queryAllPricingTiers();
    return comparePricingTierViewController(pricingTiersStream)
        .map((pricingTierCompare) => {
            return {
                pricingTierCompare: pricingTierCompare
            };
        })
        .flatMapLatest((data) => {
            return queryLoadFile(`${__dirname}/../../html/register.html`)
                .map((contents) => {
                    return {
                        header: {
                            title: 'Register',
                            stylesheet: '/public/styles/register.css'
                        },
                        body: {
                            bodyClassHook: 'page-register',
                            contents: mustache.render(contents, data)
                        },
                        footer: {
                            scripts: 'dashboard/pages/register'
                        }
                    };
                });
        })
};
