'use strict';

import React from 'react';

export let __hotReload = true;
export default function ({ onSampleSizeChange, abtest, onNameChange, onSubmit }) {

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={abtest.get('name')} placeholder="Untitled" onChange={onNameChange} type="text" className="form-control" />
                <div className="input-group">
                    <span className="input-group-addon">Sample Size</span>
                    <input type="text" className="form-control" value={abtest.get('sampleSize')} onChange={onSampleSizeChange} />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    );
}