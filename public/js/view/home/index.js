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
        const list = AbTestList(...arguments);
        const sidebar = HomeSidebar({ user, createAbTestHref });
        body = (
            <div className="row">
                <div className="col-xs-9">
                    {list}
                </div>
                <div className="col-xs-3">
                    {sidebar}
                </div>
            </div>
        );
    } else {
        body = NoAbTests({ createAbTestHref });
    }

    return (
        <div className="container-fluid clearfix">
            {body}
        </div>
    );
}
