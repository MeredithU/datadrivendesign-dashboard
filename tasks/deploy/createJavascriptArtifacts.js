'use strict';

const rx = require('rx');
const glob = require('glob');
const jspm = require('jspm');
const builder = new jspm.Builder();

rx.Observable.create(function (o) {

    o.onNext('./public/dashboard.js');

    glob('./public/js/pages/**/*.js', function (err, files) {
        if (err) {
            o.onError(err);
        }

        files.forEach(o.onNext, o);
        o.onCompleted();

    });

})
.subscribe((path) => {
    const p = path.replace('./', '');
    const dest = `./dist/${p}`;

    console.log('building', p);
    builder.buildStatic(path, dest, {
        minify: true
    });
});
