'use strict';

// Client
import requestAbTest from 'dashboard/action/requestAbTest';

export default function (user) {
    const path = `/pricingtiers`;

    return requestAbTest(path).shareReplay(1);
}
