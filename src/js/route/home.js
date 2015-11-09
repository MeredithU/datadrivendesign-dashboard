'use strict';

import rx from 'rx';

// Streams
import abtestServiceConfig from 'dashboard/stream/configuration/abtestService';

// Views
import defaultLayout from 'dashboard/component/layout/default';
import HomeView from 'dashboard/view/Home';


export default function (route) {

    return abtestServiceConfig.flatMapLatest((config) => {
        const url = `${config.prototcol}://${config.hostname}:${config.port}/abtests`;
        const promise = fetch(url, params);

    })


    const home = HomeView({
        abtests:[]
    });
    const withLayout = defaultLayout(home);

    return rx.Observable.return(withLayout);

}