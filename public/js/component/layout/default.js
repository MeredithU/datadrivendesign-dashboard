'use strict';

import React from 'react';

export default function ({ user, page }) {
    return (
        <div>
            <header className="app-header container-fluid">
                <div className="col-xs-4 col-sm-offset-8 text-right">
                    Hello, {user.get('username')}
                </div>
            </header>
            <main className="app-page">
                {page}
            </main>
        </div>

    );

}