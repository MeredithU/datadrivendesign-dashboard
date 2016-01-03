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
                <a className="btn btn-primary" href={createAbTestHref}>Create new A/B Test</a>
            </div>
            <hr className="visible-xs" />
        </div>
    );

}
