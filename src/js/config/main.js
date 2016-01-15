'use strict';

const rx = require('rx');


module.exports = rx.Observable.create(function (o) {
    const abtestOrigin = process.env.DASHBOARD_ABTEST_APP_ORIGIN;

    o.onNext({
        abtestOrigin: abtestOrigin
    });

    o.onCompleted();

});
