'use strict';

import loginUserAction from 'turissini/action/user/userLoginAction';

export default function (userData) {
    const stream = loginUserAction(userData).replay(undefined, 1);


    stream.last().subscribe(function (message) {
        const resp = message.data;

        var usersessionid = resp.data.id;
        var userSessionString = JSON.stringify({
            id: usersessionid
        });

        var userid = resp.data.relationships.user.id;

        window.sessionStorage.setItem('user-session', userSessionString);
        window.sessionStorage.setItem('user-id', userid);
        window.location.href = '/_/';
    });

    stream.connect();

    return stream;
}
