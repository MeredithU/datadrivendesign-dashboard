'use strict';

import React from 'react';
import moment from 'moment';

import cx from 'classnames';

// View
import AbTestList from 'dashboard/component/abtest/list';
import NoAbTests from 'dashboard/component/abtest/none';
import HomeSidebar from 'dashboard/component/home/sidebar';

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
                <section>
                    <header>
                        <h3>Active A/B Tests</h3>
                        <hr />
                    </header>
                    {activeList}
                </section>
            );
        }

        if (sorted.completed.length) {
            const completedList = AbTestList({
                classNames,
                abtests: sorted.completed
            });

            completedSection = (
                <section>
                    <header>
                        <h3>Completed A/B Tests</h3>
                        <hr />
                    </header>
                    {completedList}
                </section>
            );
        }


        const sidebar = HomeSidebar({ user, createAbTestHref });
        body = (
            <div className="row">
                <div className="col-xs-12 col-sm-push-9 col-sm-3">
                    {sidebar}
                </div>
                <div className="col-xs-12 col-sm-pull-3 col-sm-9">
                    {activeSection}
                    {completedSection}
                </div>
            </div>
        );
    } else {
        body = NoAbTests({ createAbTestHref });
    }

    return (
        <div className="clearfix">
            {body}
        </div>
    );
}
