'use strict';

import React from 'react';
import cx from 'classnames';
import _ from 'lodash';


// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';

export default function ({ onSlugChange, abtestGroup, className, onNameChange = function () {} }) {

    const decoratedClassName = cx(className, 'abtestgroup-fields');

    function notifyNameChange (e) {
        onNameChange(abtestGroup, e.target.value);
    };

    function notifySlugChange(e) {
        onSlugChange(abtestGroup, e.target.value);
    }

    return (
        <div className={decoratedClassName}>
            <label>Name</label>
            <input onChange={notifyNameChange} value={abtestGroup.get('name')} placeholder="Untitled" type="text" className="form-control abtestgroup-title-input" />
            <label>Identifier</label>
            <input onChange={notifySlugChange} value={abtestGroup.get('slug')} placeholder="untitled" type="text" className="form-control abtestgroup-title-input" />
        </div>
    );
}
