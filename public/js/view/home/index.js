'use strict';

import React from 'react';
import moment from 'moment';

import cx from 'classnames';

// View
import AbTestList from 'dashboard/component/abtest/list';
import NoAbTests from 'dashboard/component/abtest/none';

export default function ({ abtests, user, createAbTestHref, classNames }) {
    let body;

    if (abtests.length) {
        const sorted = abtests.reduce((seed, abtest) => {
            const abtestState = abtest.abtestState;

            if (abtestState.isActive()) {
                seed.active.push(abtest);
            } else {
                seed.completed.push(abtest);
            }

            return seed;

        }, {
            active: [],
            completed: []
        });


        let activeSection;
        let completedSection;

        if (sorted.active.length) {
            const activeList = AbTestList({
                classNames,
                abtests: sorted.active
            });

            activeSection = (
                <section className="row">
                    <header className="col-xs-12">
                        <h3>Active A/B Tests <span className="badge">{sorted.active.length}</span></h3>
                        <hr />
                    </header>
                    <div className="col-xs-12">
                        {activeList}
                    </div>
                </section>
            );
        }

        if (sorted.completed.length) {
            const completedList = AbTestList({
                classNames,
                abtests: sorted.completed
            });

            completedSection = (
                <section className="row">
                    <header className="col-xs-12">
                        <h3>Completed A/B Tests</h3>
                        <hr />
                    </header>
                    <div className="col-xs-12">
                        {completedList}
                    </div>
                </section>
            );
        }

        body = (
            <div>
                {activeSection}
                {completedSection}
            </div>
        );
    } else {
        body = NoAbTests({ createAbTestHref });
    }

    return body;
}
