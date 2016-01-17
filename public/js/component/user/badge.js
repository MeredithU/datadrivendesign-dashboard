'use strict';

import React from 'react';

import Dropdown from 'turissini/component/dropdown/DropDown';

export default function ({ user, onLogoutClick, userApiKeysHref, pricingHref }) {
    return (
        <span className="user-welcome">Hello, {user.get('username')}</span>
    )
};
