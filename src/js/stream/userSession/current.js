'use strict';

import rx from 'rx';
import storageObservable from 'dashboard/storage/sessionStorage';

const hasUserSessionStream = storageObservable.filter((sessionStorage) => {
        return sessionStorage['user-session'];
    })
    .map((sessionStorage) => {
        return JSON.parse(sessionStorage['user-session']);
    });

const noUserSession = storageObservable.filter((sessionStorage) => {
    return !sessionStorage['user-session'];
}).map(() => { return null; });


const observable = rx.Observable.merge(
    hasUserSessionStream,
    noUserSession
).replay(undefined, 1);

observable.connect();

export default observable;
