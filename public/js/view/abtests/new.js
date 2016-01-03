'use strict';

import React from 'react';
import numeral from 'numeral';

// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';
import AbTestGroupForm from 'dashboard/component/form/AbTestGroupForm';

export let __hotReload = true;
export default function ({ onGroupSlugChange, onGroupDistributionValueChange, onGroupNameChange, onSuggestedSampleSizeClick, onRemoveAbTestGroupClick, onAddGroupButtonClick, abtestGroups, onBaselineChange, onMinDetectableEffectChange, onSampleSizeChange, statsData, abtest, onNameChange, onSubmit }) {

    const groupsMarkup = abtestGroups.map(function (abtestGroup, index) {
        const key = `abtestgroup-${index}`;

        function handleRemove () {
            onRemoveAbTestGroupClick(abtestGroup);
        }

        return (
            <div className="col-xs-12 col-md-4" key={key}>
                <AbTestGroupForm onSlugChange={onGroupSlugChange} onDistributionValueChange={onGroupDistributionValueChange} onNameChange={onGroupNameChange} abtestGroup={abtestGroup} />
                <span onClick={handleRemove}>Remove</span>
            </div>
        )

    });

    return (
        <div>

            <form className="form-abtest" onSubmit={onSubmit}>
                <header className="form-header row">
                    <div className="col-xs-12">
                        <h2 className="form-title">Create new AB Test</h2>
                    </div>
                    <div className="col-xs-12 clearfix form-group-abtest-title">
                        <div className="form-group-lg">
                            <input value={abtest.get('name')} placeholder="Untitled" onChange={onNameChange} type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-4">
                        <div className="input-group">
                            <label htmlFor="sample-size-input">Test Sample Size (Suggested size: <span onClick={onSuggestedSampleSizeClick} className="underline-hover">{numeral(statsData.sampleSize).format('0,0')}</span>)</label>
                            <NumberFormControl id="sample-size-input" format="0,0" className="form-control" value={abtest.get('sampleSize')} onChange={onSampleSizeChange} />
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-4 text-right">
                        <label htmlFor="baseline-input">Baseline conversion rate</label>
                        <div className="input-group">
                            <NumberFormControl id="baseline-input" className="form-control text-right" value={statsData.baseline} onChange={onBaselineChange} />
                            <span className="input-group-addon">%</span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-4 text-right">
                        <label htmlFor="min-detectable-input">Minimum Detectable Effect</label>
                        <div className="input-group">
                            <NumberFormControl id="min-detectable-input" className="form-control text-right" value={statsData.minDetectableEffect} onChange={onMinDetectableEffectChange} />
                            <span className="input-group-addon">%</span>
                        </div>
                    </div>
                </header>

                <section className="row abtestgroups-row">
                    {groupsMarkup}
                </section>

                <div>
                    <div className="col-xs-2 col-xs-offset-10 text-right">
                        <span onClick={onAddGroupButtonClick} className="btn btn-primary">Add Group</span>
                    </div>
                </div>

                <div className="bg-white submit-buttons text-right">
                    <input type="submit" className="btn btn-primary" value="Save" />
                </div>
            </form>
        </div>
    );
}
