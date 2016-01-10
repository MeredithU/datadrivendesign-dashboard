'use strict';

import React from 'react';
import numeral from 'numeral';

// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';
import AbTestGroupForm from 'dashboard/component/form/AbTestGroupForm';

export let __hotReload = true;
export default function ({ projectedCost, controlGroup, onControlGroupChange, onGroupSlugChange, onGroupNameChange, onSuggestedSampleSizeClick, onRemoveAbTestGroupClick, onAddGroupButtonClick, abtestGroups, onBaselineChange, onMinDetectableEffectChange, onSampleSizeChange, statsData, abtest, onNameChange, onSubmit }) {
    let groupsMarkup = (
        <span>No Groups have been added to this A/B Test yet.</span>
    );

    let filteredGroups = abtestGroups.filter((abtestGroup) => {
         return (abtestGroup !== controlGroup);
    });

    if (filteredGroups.length) {
        groupsMarkup = filteredGroups.map(function (abtestGroup, index) {
            const key = `abtestgroup-${index}`;

            function handleRemove () {
                onRemoveAbTestGroupClick(abtestGroup);
            }

            return (
                <div key={key}>
                    <AbTestGroupForm onSlugChange={onGroupSlugChange} onNameChange={onGroupNameChange} abtestGroup={abtestGroup} />
                    <span onClick={handleRemove}>Remove</span>
                </div>
            )

        });
    }

    return (
        <div className="container-fluid">
            <form onSubmit={onSubmit}>
                <section>
                    <h3>A/B Test Title</h3>
                    <div className="form-group-lg">
                        <input value={abtest.get('name')} placeholder="Untitled" onChange={onNameChange} type="text" className="form-control" />
                    </div>
                </section>
                <hr />

                <section>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Impressions Sample Size</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-sm-push-6">
                            <label htmlFor="baseline-input">Baseline conversion rate</label>
                            <div className="input-group">
                                <NumberFormControl id="baseline-input" className="form-control text-right" value={statsData.baseline} onChange={onBaselineChange} />
                                <span className="input-group-addon">%</span>
                            </div>

                            <label htmlFor="min-detectable-input">Minimum Detectable Effect</label>
                            <div className="input-group">
                                <NumberFormControl id="min-detectable-input" className="form-control text-right" value={statsData.minDetectableEffect} onChange={onMinDetectableEffectChange} />
                                <span className="input-group-addon">%</span>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-sm-pull-6">
                            <label htmlFor="sample-size-input">Target Sample Size (Suggested size: <span onClick={onSuggestedSampleSizeClick} className="underline-hover">{numeral(statsData.sampleSize).format('0,0')}</span>)</label>

                            <div className="input-group">
                                <span className="input-group-addon">Run until</span>
                                <NumberFormControl id="sample-size-input" format="0,0" className="form-control" value={abtest.get('sampleSize')} onChange={onSampleSizeChange} />
                                <span className="input-group-addon">Impressions</span>
                            </div>
                            Estimated Cost: {numeral(projectedCost.get('cost')).format('$0,0.00')}
                        </div>
                    </div>

                </section>

                <hr />

                <section>
                    <h3>A/B Test Control Group</h3>
                    <AbTestGroupForm onSlugChange={onGroupSlugChange} onNameChange={onGroupNameChange} abtestGroup={controlGroup} />
                </section>

                <hr />
                <section>
                    <header>
                        <h3 className="no-margin-top">A/B Testing Groups</h3>
                    </header>
                    <div>
                        {groupsMarkup}
                    </div>
                    <div className="text-right">
                        <span onClick={onAddGroupButtonClick} className="btn btn-primary">Add A/B Test Group</span>
                    </div>

                </section>
                <hr />

                <footer className="text-right">
                    <input type="submit" className="btn btn-primary" value="Create A/B Test" />
                </footer>

            </form>
        </div>
    );
}
