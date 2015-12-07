'use strict';

import React from 'react';
import currentUserSessionStream from 'dashboard/stream/userSession/current';

// stream

export default function ({ abtests, createAbTestHref }) {
    let abtestsList;

    if (abtests !== null) {
        abtestsList = abtests.map(function (abtestData, index) {
            const abtest = abtestData.abtest;
            const abtestGroups = abtestData.abtestGroups;
            const key = `abtest-${index}`;
            let totalReported = 0;

            const groups = abtestGroups.map(function (abtestGroupData, groupIndex) {
                const group = abtestGroupData.abtestGroup;
                const population = abtestGroupData.meta.impressions_count;
                const key = `abtest-${abtest.id}-group-${groupIndex}`;

                totalReported += population;

                return (
                    <div className="col-xs-4" key={key}>
                        <h4>{group.get('name')}</h4>
                        <div>Population: {population}</div>
                        <div>Conversions: {abtestGroupData.meta.conversions_count}</div>
                    </div>
                );
            });

            let percentReported = Math.round((totalReported / abtest.get('sampleSize')) * 100) / 100;

            if (abtest.get('sampleSize') === 0) {
                percentReported = 0;
            }

            return (
                <div key={key}>
                    <h2>{abtest.get('name') || 'Untitled'}</h2>
                    <small>{abtest.get('id')}</small>
                    <div>Total Sample size: {abtest.get('sampleSize')}</div>
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