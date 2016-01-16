'use strict';

const rx = require('rx');
const request = require('request');
const configStream = require('./../../config/main');
const _ = require('lodash');


module.exports = function () {
    return configStream.flatMapLatest((config) => {
        return rx.Observable.create(function (o) {
            request('http://' + config.abtestOrigin + '/pricingtiers', function (error, response, body) {
                if (error) {
                    o.onError(error);
                    return;
                }

                const json = JSON.parse(body);

                json.data.forEach(function (tier) {
                    const map = new Map();
                    Object.keys(tier.attributes).forEach(function (attr) {
                        map.set(attr, tier.attributes[attr]);
                    });

                    map.id = tier.id;
                    o.onNext(map);
                });

                o.onCompleted();

            });
        });
    });
}
