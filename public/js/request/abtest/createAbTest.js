'use strict';


export default function (userSession, user, abtest, abtestGroups) {
    const body = abtest.asJSON();

    body.groups = abtestGroups.map(function (abtestGroup) {
        return abtestGroup.asJSON();
    });

    return {
        path: `/users/${user.get('id')}/abtests`,
        method: 'POST',
        body: JSON.stringify({
            data: {
                attributes: {
                    name: abtest.get('name'),
                    sampleSize: abtest.get('sampleSize')
                },
                relationships: {
                    abtestGroup: abtestGroups.map(function (abtestGroup) {
                        return {
                            slug: abtestGroup.get('slug'),
                            distribution: abtestGroup.get('distribution'),
                            name: abtestGroup.get('name')
                        };
                    })
                }
            }
        }),
        headers: {
            'authentication': `token ${user.get('id')}:${userSession.get('id')}`
        }

    };

}
