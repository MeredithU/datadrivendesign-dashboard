'use strict';


export default function (userSession, user, abtest, abtestGroupControl, abtestGroups) {
    const body = abtest.asJSON();

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
                    abtestGroupControl: {
                        type: 'abtestgroup',
                        attributes: abtestGroupControl.asJSON()
                    },
                    abtestGroup: abtestGroups.map(function (abtestGroup) {
                        return {
                            type: 'abtestgroup',
                            attributes: {
                                slug: abtestGroup.get('slug'),
                                distribution: abtestGroup.get('distribution'),
                                name: abtestGroup.get('name')
                            }
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
