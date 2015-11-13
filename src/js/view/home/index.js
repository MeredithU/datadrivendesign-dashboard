'use strict';

import React from 'react';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// stream

export default function ({ createAbTestHref, abtests = [] }) {

    const abtestsList = abtests.map(function (abtest, index) {
        const key = `abtest-${index}`;
        let totalReported = 0;

        const groups = abtest.groups.map(function (group, groupIndex) {
            const key = `abtest-${abtest.id}-group-${groupIndex}`;

            totalReported += group.impressions;

            return (
                <div className="col-xs-4" key={key}>
                    <h4>{group.name}</h4>
                    <div>Impressions: {group.impressions}</div>
                    <div>Conversions: {group.conversions}</div>
                </div>
            );
        });

        const percentReported = Math.round((totalReported / abtest.sampleSize) * 100) / 100;

        return (
            <div key={key}>
                <h2>{abtest.name}</h2>
                <div>Total Sample size: {abtest.sampleSize}</div>
                <div>Reported: {totalReported} ({percentReported}%)</div>
                <div className="row clearfix">
                    {groups}
                </div>
            </div>
        );

    });

    return (
        <div>
            <a href={createAbTestHref} className="btn btn-primary">New AB Test</a>
            {abtestsList}
        </div>
    );
}