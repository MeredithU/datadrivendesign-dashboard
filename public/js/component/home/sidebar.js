'use strict';

import React from 'react';


export default function ({ user, createAbTestHref }) {

    return (
        <div>
            <div>
                Your api key: <strong>{user.get('apiKey')}</strong>
            </div>
            <hr />
            <div>
                <a className="btn btn-success" href={createAbTestHref}>Create new AB Test</a>
            </div>
        </div>
    );

}
