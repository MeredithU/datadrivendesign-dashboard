'use strict';

const rx = require('rx');
const request = require('request');
const configStream = require('./../../config/main');


module.exports = function () {
    return configStream.flatMapLatest((config) => {
        return rx.Observable.create(function (o) {
            request('http://' + config.abtestOrigin + '/pricingtiers', function (error, response, body) {
                if (error) {
                    o.onError(error);
                    return;
                }

                const json = JSON.parse(body);

                o.onNext(json);
                o.onCompleted();

            });
        });
    });
}
