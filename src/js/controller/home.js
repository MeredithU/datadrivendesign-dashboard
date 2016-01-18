'use strict';

const rx = require('rx');
const queryAllPricingTiers = require('./../queries/pricingTiers/allPricingTiers');
const queryLoadFile = require('./../queries/file/loadFile');

const mustache = require('mustache');
const comparePricingTierViewController = require('./../view-controller/pricingTier/select');

module.exports = function (req) {
    return queryLoadFile(`${__dirname}/../../html/index.html`)
        .map((contents) => {
            return {
                header: {
                    title: 'A/B Testing',
                    stylesheet: 'public/styles/home.css'
                },
                body: {
                    bodyClassHook: 'page-welcome',
                    contents: contents
                },
                footer: {}
            };
        });
};
