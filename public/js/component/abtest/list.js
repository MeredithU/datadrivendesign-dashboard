'use strict';

import React from 'react';
import moment from 'moment';

import cx from 'classnames';

export default function ({ abtests, classNames }) {
    let abtestsList;

    if (abtests !== null) {
        abtestsList = abtests.map(function (abtestData, index) {
            const abtestState = abtestData.abtestState;
            const abtest = abtestData.abtest;
            const abtestGroups = abtestData.abtestGroups;
            const key = `abtest-${index}`;
            let totalReported = 0;

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
            const classnames = cx(classNames, 'clearfix abtest abtest-row');
            const activeClassname = cx('abtest-status', {
                'status-active': abtestState.isActive(),
                'status-complete': abtestState.isComplete()
            });

            const abtestTitle = abtest.get('name') || 'Untitled';

            return (
                <div className={classnames} key={key}>
                    <div className="col-md-2 abtest-meta text-center pad">
                        <h5 className="month">{created.format('MMM')}</h5>
                        <h4 className="day">{created.format('DD')}</h4>
                        <h6 className={activeClassname}>{abtestState.get('status')}</h6>
                    </div>
                    <div className="col-md-10 abtest-main pad">
                        <h2 className="abtest-title">{abtestTitle} <small>({abtest.get('id')})</small></h2>
                        <div className="row">
                            <div className="col-xs-6">Runs until {abtest.get('sampleSize')} impressions.</div>
                            <div className="col-xs-6">{totalReported} ({percentReported}%) Impressions to date</div>
                        </div>
                    </div>
                </div>
            );

        });
    }

    return (
        <div className="container-fluid clearfix">
            {abtestsList}
        </div>
    );
}
