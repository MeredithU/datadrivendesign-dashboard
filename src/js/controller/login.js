'use strict';

const rx = require('rx');
const queryAllPricingTiers = require('./../queries/pricingTiers/allPricingTiers');
const queryLoadFile = require('./../queries/file/loadFile');

const mustache = require('mustache');
const comparePricingTierViewController = require('./../view-controller/pricingTier/select');

module.exports = function (req) {
    return queryLoadFile(`${__dirname}/../../html/login.html`)
        .map((contents) => {
            return {
                header: {
                    title: 'Login',
                },
                body: {
                    bodyClassHook: 'page-login',
                    contents: contents
                },
                footer: {
                    scripts: 'turissini/pages/login'
                }
            };
        });
};
