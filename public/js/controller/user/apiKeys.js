'use strict';

import rx from 'rx';
import React from 'react';

// Stream
import currentUserStream from 'turissini/stream/user/current';

// Query
import queryUserApiKey from 'turissini/queries/user/getApiKey';

export default function (req) {
    return currentUserStream.flatMapLatest((user) => {
        return queryUserApiKey(user);
    })
    .map((apikey) => {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h1>API Keys</h1>
                </div>
                <hr />
                <div className="col-xs-12">
                    {apikey.get('id')}
                </div>
            </div>
        );
    })
};
