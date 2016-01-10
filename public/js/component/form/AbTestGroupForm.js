'use strict';

import React from 'react';
import cx from 'classnames';
import _ from 'lodash';


// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';

export default function ({ onSlugChange, abtestGroup, className, onNameChange = function () {} }) {

    const decoratedClassName = cx(className, 'abtestgroup-fields row');

    function notifyNameChange (e) {
        onNameChange(abtestGroup, e.target.value);
    };

    function notifySlugChange(e) {
        onSlugChange(abtestGroup, e.target.value);
    }


    return (
        <div className={decoratedClassName}>
            <div className="col-xs-12 col-sm-6">
                <div className="input-group input-group-sm">
                    <span className="input-group-addon" id="sizing-addon3">Name</span>
                    <input onChange={notifyNameChange} value={abtestGroup.get('name')} placeholder="Untitled" type="text" className="form-control" />
                </div>
            </div>
            <div className="col-xs-12 col-sm-6">
                <div className="input-group input-group-sm">
                    <span className="input-group-addon" id="sizing-addon3">Identifier</span>
                    <input onChange={notifySlugChange} value={abtestGroup.get('slug')} placeholder="untitled" type="text" className="form-control" />
                </div>
            </div>
        </div>
    );
}
