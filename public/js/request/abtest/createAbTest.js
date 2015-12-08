'use strict';


export default function (userSession, user, abtest, abtestGroups) {
    const body = abtest.asJSON();

    body.groups = abtestGroups.map(function (abtestGroup) {
        return abtestGroup.asJSON();
    });

    return {
        path: `/users/${user.get('id')}/abtests`,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'authentication': `token ${user.get('id')}:${userSession.get('id')}`
        }

    };

}