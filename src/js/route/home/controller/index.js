'use strict';

import rx from 'rx';

// Streams
import currentAbtestsStream from 'dashboard/route/home/stream/abtests/current';

// Views
import defaultLayout from 'dashboard/component/layout/default';
import indexView from 'dashboard/route/home/view/index';


export default function (route) {

    return currentAbtestsStream.map((resp) => {
        const home = indexView({
            abtests: resp
        });
        
        return defaultLayout(home);

    });

}