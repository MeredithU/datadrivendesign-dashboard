'use strict';

import React from 'react';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// stream

export default function ({ createAbTestHref, abtests }) {
    let abtestsList;

    if (abtests !== null) {
        abtestsList = abtests.map(function (abtest, index) {
            const key = `abtest-${index}`;
            let totalReported = 0;

            const groups = abtest.groups.map(function (group, groupIndex) {
                const key = `abtest-${abtest.id}-group-${groupIndex}`;

                totalReported += group.population;

                return (
                    <div className="col-xs-4" key={key}>
                        <h4>{group.name}</h4>
                        <div>Population: {group.population}</div>
                        <div>Conversions: {group.conversions}</div>
                    </div>
                );
            });

            const percentReported = Math.round((totalReported / abtest.sampleSize) * 100) / 100;

            return (
                <div key={key}>
                    <h2>{abtest.name}</h2>
                    <small>{abtest.id}</small>
                    <div>Total Sample size: {abtest.sampleSize}</div>
                    <div>Reported: {totalReported} ({percentReported}%)</div>
                    <div className="row clearfix">
                        {groups}
                    </div>
                </div>
            );

        });
    }

    return (
        <div className="container-fluid">
            <a href={createAbTestHref} className="btn btn-primary">New AB Test</a>
            {abtestsList}
        </div>
    );
}