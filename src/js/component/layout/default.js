'use strict';

import React from 'react';

export default function ({ user, page }) {

    return (
        <div>
            <header>{user.email}</header>
            {page}
        </div>

    );

}