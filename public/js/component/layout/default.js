'use strict';

import React from 'react';
import cx from 'classnames';

export default function ({ dropdownClick, dropDownOpen, user, page, onLogoutClick, documentationHref }) {
    const dropdownClassName = cx('dropdown col-xs-6', {
        open: dropDownOpen
    });

    return (
        <main className="app-page bg-white">
            {page}
        </main>

    );

}
