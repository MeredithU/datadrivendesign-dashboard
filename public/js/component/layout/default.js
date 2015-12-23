'use strict';

import React from 'react';
import cx from 'classnames';

export default function ({ dropdownClick, dropDownOpen, user, page, onLogoutClick, documentationHref }) {
    const dropdownClassName = cx('pull-right dropdown', {
        open: dropDownOpen
    });

    return (
        <div>
            <header className="app-header container-fluid">
                <h1 className="app-title col-xs-6">
                    <a href="/#/">Data Driven Design</a>
                </h1>
                <div className="col-xs-4 col-sm-offset-2 text-right">
                    <ul className="nav nav-pills">
                        <li><a href={documentationHref}>API Documentation</a></li>
                        <li className={dropdownClassName}>
                            <a href="#" onClick={dropdownClick} className="dropdown-toggle">
                                <span>
                                    Hello, {user.get('username')}
                                    <span className="caret"></span>
                                </span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="#" onClick={onLogoutClick}>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </header>
            <main className="app-page">
                {page}
            </main>
        </div>

    );

}
