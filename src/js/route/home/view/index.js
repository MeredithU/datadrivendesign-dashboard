'use strict';

import React from 'react';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// stream

export default function ({ abtests = [] }) {

    const abtestsList = abtests.map(function (abtest, index) {
        const key = `abtest-${index}`;

        const groups = abtest.groups.map(function (group, groupIndex) {
            const key = `abtest-${abtest.id}-group-${groupIndex}`;

            return (
                <div key={key}>
                    <h4>{group.name}</h4>
                    {group.sampleSize}
                </div>
            );
        });

        return (
            <div key={key}>
                <h2>{abtest.name}</h2>
                {groups}
            </div>
        );

    });


    return (
        <div>
            {abtestsList}
        </div>
    );
}