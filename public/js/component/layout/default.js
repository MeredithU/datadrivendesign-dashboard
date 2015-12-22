'use strict';

import React from 'react';

export default function ({ user, page, onLogoutClick }) {
    return (
        <div>
            <header className="app-header container-fluid">
                <h1 className="app-title col-xs-6">
                    <a href="/#/">Data Driven Design</a>
                </h1>
                <div className="col-xs-4 col-sm-offset-2 text-right">
                    Hello, {user.get('username')}

                    <a href="#" onClick={onLogoutClick}>Logout</a>
                </div>
            </header>
            <main className="app-page">
                {page}
            </main>
        </div>

    );

}
