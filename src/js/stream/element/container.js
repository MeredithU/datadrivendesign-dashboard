'use strict';

import rx from 'rx';

export default rx.Observable.return('container')
    .map((id) => {
        return document.getElementById(id);
    });