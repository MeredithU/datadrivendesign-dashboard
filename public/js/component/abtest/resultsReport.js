'use strict';

import React from 'react';
import numeral from 'numeral';

export default function ({ abtestResult }) {
    const winner = abtestResult.winner;
    const confidence = numeral(0.99) ;//abtestResult.get('confidence'));
    const winnerName = (
        <strong className="text-info">"{winner.get('name')}"</strong>
    );
    let confidenceComponent;
    let resultComponent;

    if (confidence >= 0.95) {
        confidenceComponent = (
            <span>
                and we are <strong className="text-success">{confidence.format('00%')}</strong> confident that this version of the test will consistently lead to higher conversion going forward.
            </span>
        );
    } else {
        confidenceComponent = (
            <span>
                but we are only <strong className="text-danger">{confidence.format('00%')}</strong> confident, that the changes in this test will consistently lead to better results versus the control group. As a result, we recommend that you stay with your control group.
            </span>
        );
    }

    return (
        <div>
            <p>
                Test {winnerName} had the best conversion rate of all the A/B Testing Groups, {confidenceComponent}
            </p>

        </div>
    );
}
