'use strict';

import React from 'react';
import cx from 'classnames';

export default function ({ dropdownClick, dropDownOpen, user, page, onLogoutClick, documentationHref }) {
    const dropdownClassName = cx('dropdown col-xs-6', {
        open: dropDownOpen
    });

    return (
        <div>
            <header className="bg-blue page-header app-header section clearfix">
                <h1 className="site-title col-sm-4">
                    <a href="/_/#/">
                        <svg width="32" height="32" className="logo-svg color-compliment">
                            <rect x="0" y="0" width="20" height="6" fill="#fff" />
                            <rect x="7" y="5" width="6" height="16" fill="#fff" />
                            <rect x="18" y="11" width="6" height="16" fill="#fff" />
                            <rect x="11" y="26" width="20" height="6" fill="#fff" />
                        </svg>
                        <span>Turissini Technologies, LLC</span>
                    </a>
                </h1>
                <nav className="header-nav col-sm-8 col-xs-12">
                    <ul className="no-bullet row text-right">
                        <li className="col-xs-6"><a href={documentationHref}>API Documentation</a></li>
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
                </nav>
            </header>
            <main className="app-page bg-white">
                {page}
            </main>
        </div>

    );

}
