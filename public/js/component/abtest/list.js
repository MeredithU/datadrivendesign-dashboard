'use strict';

import React from 'react';
import moment from 'moment';

import cx from 'classnames';

import AbTestStatus from 'dashboard/component/abtest/abtestStatus';

export default function ({ abtests, classNames }) {
    let abtestsList;

    if (abtests !== null) {
        abtestsList = abtests.map(function (abtestData, index) {
            const abtestState = abtestData.abtestState;
            const abtest = abtestData.abtest;
            const abtestGroups = abtestData.abtestGroups;
            const abtestGroupControl = abtestData.abtestControlGroup;

            const key = `abtest-${index}`;
            let totalReported = abtestGroupControl.meta.impressionsCount;

            const groups = abtestGroups.map(function (abtestGroupData, groupIndex) {
                const group = abtestGroupData.abtestGroup;
                const population = abtestGroupData.meta.impressionsCount;
                const key = `abtest-${abtest.id}-group-${groupIndex}`;

                totalReported += population;

                return (
                    <div className="col-xs-4" key={key}>
                        <h4>{group.get('name')}</h4>
                        <div>Population: {population}</div>
                        <div>Conversions: {abtestGroupData.meta.conversionsCount}</div>
                    </div>
                );
            });

            let percentReported = Math.round((totalReported / abtest.get('sampleSize')) * 100);

            if (abtest.get('sampleSize') === 0) {
                percentReported = 0;
            }

            const created = moment(abtest.get('created'));
            const classnames = cx(classNames, 'row abtest abtest-row');
            const activeClassname = cx('abtest-status', {
                'status-active': abtestState.isActive(),
                'status-complete': abtestState.isComplete()
            });

            const abtestTitle = abtest.get('name') || 'Untitled';
            const abtestHref = abtest.href;

            return (
                <div className={classnames} key={key}>
                    <div className="col-xs-2 abtest-meta text-center pad">
                        <div className="abtest-meta-content">
                            <h5 className="month">{created.format('MMM')}</h5>
                            <h4 className="day">{created.format('DD')}</h4>
                        </div>
                    </div>
                    <div className="col-xs-10 abtest-main pad">
                        <h3 className="abtest-title"><a href={abtestHref}>{abtestTitle}</a></h3>
                        <div className="row">
                            <div className="col-xs-12">
                                <AbTestStatus abtest={abtest} abtestState={abtestState} />
                            </div>
                        </div>
                    </div>
                </div>
            );

        });
    }

    return (
        <div>
            {abtestsList}
        </div>
    );
}
