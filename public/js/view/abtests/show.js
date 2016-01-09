'use strict';

import React from 'react';
import cx from 'classnames';

import abtestCalculator from 'abtest-calculator';

export default function ({ abtest, abtestGroups, abtestControlGroup, abtestState }) {

    const abtestGroupsComponents = abtestGroups.concat(abtestControlGroup).map((abtestGroupObj) => {
        const abtestGroup = abtestGroupObj.abtestGroup;
        const meta = abtestGroupObj.meta;
        const key = `abtest-group-${abtestGroup.get('id')}`;

        return (
            <div key={key}>
                <h4>{abtestGroup.get('name')}</h4>
                <h5>Impressions: {meta.impressionsCount}</h5>
                <h5>Conversions: {meta.conversionsCount}</h5>
            </div>
        );

    });

    const activeClassname = cx('abtest-status', {
        'status-active': abtestState.isActive(),
        'status-complete': abtestState.isComplete()
    });

    return (
        <div>
            <header>
                <h2>{abtest.get('name')}</h2>
                <h6>{abtest.get('id')}</h6>
                <h6 className={activeClassname}>{abtestState.get('status')}</h6>
            </header>
            <section>
                {abtestGroupsComponents}
            </section>
        </div>
    );

};
