'use strict';

import React from 'react';
import cx from 'classnames';
import numeral from 'numeral';
import moment from 'moment';

import abtestCalculator from 'abtest-calculator';

import AbTestStatus from 'dashboard/component/abtest/abtestStatus';
import AbTestResultsReport from 'dashboard/component/abtest/resultsReport';


export default function ({ abtest, abtestGroups, abtestControlGroup, abtestState, abtestResult }) {

    const hasResult = (abtestResult !== null);
    let resultComponent;

    if (hasResult) {
        resultComponent = (
            <div className="alert alert-info">
                <AbTestResultsReport abtestResult={abtestResult} />
            </div>
        );
    }


    const abtestGroupsComponents = abtestGroups.map((abtestGroupObj, index) => {
        const abtestGroup = abtestGroupObj.abtestGroup;
        const meta = abtestGroupObj.meta;
        const key = `abtest-group-${abtestGroup.get('id')}`;
        const conversionRate = numeral((meta.conversionsCount / meta.impressionsCount)).format('00%');
        const isWinner = abtestResult ? (abtestGroup.get('id') == abtestResult.winner.get('id')) : false;
        const isControl = (abtestControlGroup.abtestGroup.get('id') === abtestGroup.get('id'));
        let winnerIcon;

        if (isWinner) {
            winnerIcon = (
                <i className="glyphicon glyphicon-ok-circle icon-winner"></i>
            );
        }

        const className = cx('row abtest-group', {
            'bg-success': isWinner,
            'text-success': isWinner,
            'is-winner': isWinner,
            'is-control': isControl,
            'row-alternate': (index % 2) === 1
        });

        return (
            <div key={key} className={className}>
                {winnerIcon}
                <div className="col-xs-12 col-sm-3">
                    <header className="header-abtest-group xs-text-center">
                        <h3 className="no-margin-top abtest-group-name">
                            {abtestGroup.get('name')}
                        </h3>
                    </header>
                </div>
                <div className="col-xs-4 col-sm-3 text-center">
                    <div>
                        <div className="cell-heading-big">
                            {meta.impressionsCount}
                        </div>
                        Impressions
                    </div>
                </div>
                <div className="col-xs-4 col-sm-3 text-center">
                    <div>
                        <div className="cell-heading-big">
                            {meta.conversionsCount}
                        </div>
                        Conversions
                    </div>
                </div>
                <div className="col-xs-4 col-sm-3 text-center">
                    <div>
                        <div className="cell-heading-big">
                            {conversionRate}
                        </div>
                         Conversion Rate
                    </div>
                </div>
            </div>
        );

    });

    const created = moment(abtest.get('created'));

    return (
        <div className="container-fluid">
            <header className="row">
                <div className="col-xs-12 xs-text-center sm-text-left">
                    <h1>{abtest.get('name')}</h1>
                    <div>
                        Ab Test Id: {abtest.get('id')}
                    </div>
                    <div>Created on {created.format('MMMM D, YYYY')}</div>
                    <AbTestStatus abtest={abtest} abtestState={abtestState} />
                    <hr />
                    {resultComponent}
                </div>
            </header>
            <section className="row">
                <div className="col-xs-12">
                    {abtestGroupsComponents}
                </div>
            </section>
        </div>
    );

};
