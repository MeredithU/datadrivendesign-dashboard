'use strict';

import React from 'react';


export default function ({ createAbTestHref }) {

    return (
        <div className="abtest-none text-center pad">
            <h4>You have not created any abtests.</h4>
            <h5>Get started by <a href={createAbTestHref}>creating one now.</a></h5>
        </div>
    );

};
