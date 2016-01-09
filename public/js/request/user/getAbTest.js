'use strict';


export default function (user, userSession, abtestId) {

    return {
        path: `/users/${user.get('id')}/abtests/${abtestId}`,
        method: 'GET',
        headers: {
            'authentication': `token ${user.get('id')}:${userSession.get('id')}`
        }

    };

}
