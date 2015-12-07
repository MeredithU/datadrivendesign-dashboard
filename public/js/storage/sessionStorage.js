'use strict';

import EventEmitter from 'events';
import rx from 'rx';

const emitter = new EventEmitter();

const observable = rx.Observable.fromEventPattern(
    function add (h) {
        emitter.addListener('write', h);
    },

    function remove (h) {
        emitter.removeListener('write', h);
    }
)
.map(() => {
    return window.sessionStorage;
})
.startWith(window.sessionStorage)
.replay(undefined, 1);

const sessionStorage = Object.create(observable);


sessionStorage.save = function (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    emitter.emit('write');
};

observable.connect();

export default sessionStorage;