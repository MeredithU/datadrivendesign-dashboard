'use strict';

import rx from 'rx';
import storageObservable from 'dashboard/storage/sessionStorage';

// Model
import UserSession from 'dashboard/model/userSession';

const hasUserSessionStream = storageObservable.filter((sessionStorage) => {
        return sessionStorage['user-session'];
    })
    .map((sessionStorage) => {
        return JSON.parse(sessionStorage['user-session']);
    })
    .map((userSessionData) => {
        return UserSession.create(userSessionData);
    });

const noUserSession = storageObservable.filter((sessionStorage) => {
    return !sessionStorage['user-session'];
}).map(() => { return null; });


export default rx.Observable.merge(
        hasUserSessionStream,
        noUserSession
    )
    .shareReplay(1);
