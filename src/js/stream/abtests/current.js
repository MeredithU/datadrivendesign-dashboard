'use strict';

import rx from 'rx';
import _ from 'lodash';

// Stream
import abtestServiceConfigStream from 'dashboard/stream/configuration/abtestService';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// Action
import requestUrl from 'dashboard/action/requestUrl';


export default abtestServiceConfigStream.combineLatest(
        currentUserSessionStream,
        function (config, userSession) {
            return { config, userSession }
        }

    ).flatMapLatest(({ config, userSession }) => {
        const urlConfig = _.clone(config);
        urlConfig.pathname = `/users/${userSession.user_id}/abtests`;

        const params = {
            method: 'get',
            headers: {
                'x-auth-token': userSession.id
            }
        };

        return rx.Observable.interval(5000)
            .map(() => {
                return { urlConfig, params }
            });
    })

    .flatMapLatest(({ urlConfig, params }) => {
        return requestUrl(urlConfig, params);
    });