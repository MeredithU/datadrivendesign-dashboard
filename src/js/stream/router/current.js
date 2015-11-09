'use strict';

import { Router } from 'director';
import rx from 'rx';

const routerStream = rx.Observable.create(function (o) {

    const router = Router();

    router.configure({
        async: true
    });

    o.onNext(router);

}).replay(undefined, 1);


export default routerStream;