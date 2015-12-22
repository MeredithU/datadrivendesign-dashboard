'use strict';

import rx from 'rx';

// View
import ShowAbTestView from 'dashboard/view/abtests/show';

export default function (route) {
    return rx.Observable.create(function (o) {
        o.onNext({
            hello: 'world'
        });
    })
    .map((props) => {
        return ShowAbTestView(props);
    })
}
