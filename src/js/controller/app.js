'use strict';

const rx = require('rx');
const queryAllPricingTiers = require('./../queries/pricingTiers/allPricingTiers');
const queryLoadFile = require('./../queries/file/loadFile');

const mustache = require('mustache');
const comparePricingTierViewController = require('./../view-controller/pricingTier/select');

module.exports = function (req) {
    return queryLoadFile(`${__dirname}/../../html/app.html`)
        .map((contents) => {
            return {
                header: {
                    title: 'A/B Test Dashboard',
                    stylesheet: '/public/styles/app.css'
                },
                body: {
                    bodyClassHook: 'page-app',
                    contents: contents
                },
                footer: {
                    scripts: 'dashboard'
                }
            };
        });
};
