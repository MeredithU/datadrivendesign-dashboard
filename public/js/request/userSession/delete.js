'use strict';

export default function (userSession, user) {

    return {
        path: '/usersessions',
        method: 'delete',
        headers: {
            authentication: `token ${user.get('id')}:${userSession.get('id')}`
        }
    };
}
