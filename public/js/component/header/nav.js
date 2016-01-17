'use strict';

import React from 'react';

import UserBadge from 'turissini/component/user/badge';

export default function ({ user }) {
    return (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <UserBadge user={user} />
            </li>
        </ul>
    );
};
