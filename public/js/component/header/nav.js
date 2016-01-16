'use strict';

import React from 'react';

import Dropdown from 'turissini/component/dropdown/DropDown';

export default function ({ user, onLogoutClick, documentationHref }) {
    return (
        <nav className="header-nav col-sm-8 col-xs-12">
            <ul className="no-bullet row text-right">
                <li className="col-xs-6"><a href={documentationHref}>API Documentation</a></li>
                <li className="col-xs-6">
                    <Dropdown>
                        <span>
                            Hello, {user.get('username')}
                            <span className="caret"></span>
                        </span>
                        <ul className="dropdown-menu">
                            <li><a href="#" onClick={onLogoutClick}>Logout</a></li>
                        </ul>
                    </Dropdown>

                </li>
            </ul>
        </nav>
    );
};
