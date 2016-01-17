'use strict';

import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import numeral from 'numeral';

export default function ({ abtest, abtestState }) {
    const sampleSize = numeral(abtest.get('sampleSize')).format('0,0');

    const activeClassname = cx('abtest-status', {
        'text-success': abtestState.isComplete()
    });

    let status;
    if (abtestState.isActive()) {
        status = (
            <span>
                <span className="text-capitalize">{abtestState.get('status')}</span> until {sampleSize} impressions.
            </span>
        )
    } else {
        const completedDate = moment(abtestState.get('date'));
        status = (
            <span><span className="text-capitalize">{abtestState.get('status')}</span> on {completedDate.format('MMMM D, YYYY')} after {abtest.get('sampleSize')} impressions.</span>
        )
    }

    return (
        <div className={activeClassname}>
            {status}
        </div>
    )
}
