'use strict';

import React from 'react';
import cx from 'classnames';
import moment from 'moment';

export default function ({ abtest, abtestState }) {

    const activeClassname = cx('abtest-status', {
        'text-primary': abtestState.isActive(),
        'text-success': abtestState.isComplete()
    });

    let status;
    if (abtestState.isActive()) {
        status = (
            <span>
                {abtestState.get('status')} until {abtest.get('sampleSize')} impressions.
            </span>
        )
    } else {
        const completedDate = moment(abtestState.get('date'));
        status = (
            <span>{abtestState.get('status')} on {completedDate.format('MMMM D, YYYY')} after {abtest.get('sampleSize')} impressions.</span>
        )
    }

    return (
        <div className={activeClassname}>
            {status}
        </div>
    )
}
