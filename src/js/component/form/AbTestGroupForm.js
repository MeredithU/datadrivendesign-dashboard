'use strict';

import React from 'react';
import cx from 'classnames';
import _ from 'lodash';


// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';

export default function ({ onSlugChange, abtestGroup, className, onDistributionValueChange = function () {}, onNameChange = function () {} }) {

    const decoratedClassName = cx(className, 'abtestgroup-fields');

    function notifyNameChange (e) {
        onNameChange(abtestGroup, e.target.value);
    };

    function notifyDistributionValueChange (value) {
        onDistributionValueChange(abtestGroup, value / 100);
    }

    function notifySlugChange(e) {
        onSlugChange(abtestGroup, e.target.value);
    } 

    return (
        <div className={decoratedClassName}>
            <input onChange={notifyNameChange} value={abtestGroup.get('name')} placeholder="Untitled" type="text" className="form-control abtestgroup-title-input" />
            <input onChange={notifySlugChange} value={abtestGroup.get('slug')} placeholder="untitled" type="text" className="form-control abtestgroup-title-input" />
            <label>Distribution</label>
            <div className="input-group">
                <NumberFormControl value={abtestGroup.get('distribution') * 100} onChange={notifyDistributionValueChange} className="form-control text-right" />
                <span className="input-group-addon">%</span>
            </div>
        </div>
    );
}