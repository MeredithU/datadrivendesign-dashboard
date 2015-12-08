'use strict';

export default function (userSession, user) {
    const path = `/users/${user.get('id')}/abtests`;

    return {
        path: path,
        method: 'get',
        headers: {
            authentication:`token ${user.get('id')}:${userSession.get('id')}`
        }
    };

}