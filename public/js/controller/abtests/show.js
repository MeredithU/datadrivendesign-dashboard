'use strict';

import rx from 'rx';

// Stream
import currentUserStream from 'dashboard/stream/user/current';
import currentUserSessionStream from 'dashboard/stream/userSession/current';
import createUserAbTestStream from 'dashboard/stream/user/abtest';

// View
import ShowAbTestView from 'dashboard/view/abtests/show';

export default function (route) {

    return createUserAbTestStream(
        currentUserStream,
        currentUserSessionStream,
        route.params.abtest_id
    )
    .map((props) => {
        const abtestControlGroup = props.abtestControlGroup.abtestGroup;
        const abtestGroups = props.abtestGroups.filter((a) => {
            return (a.abtestGroup.get('id') !== abtestControlGroup.get('id'));
        });

        abtestGroups.unshift(props.abtestControlGroup);
        props.abtestGroups = abtestGroups;

        return ShowAbTestView(props);
    });
}
