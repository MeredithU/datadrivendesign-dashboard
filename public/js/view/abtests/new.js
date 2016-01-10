'use strict';

import React from 'react';
import numeral from 'numeral';

// Components
import NumberFormControl from 'dashboard/component/form-control/NumberFormControl';
import AbTestGroupForm from 'dashboard/component/form/AbTestGroupForm';

export let __hotReload = true;
export default function ({ projectedCost, controlGroup, onControlGroupChange, onGroupSlugChange, onGroupNameChange, onRemoveAbTestGroupClick, onAddGroupButtonClick, abtestGroups, onBaselineChange, onMinDetectableEffectChange, onSampleSizeChange, statsData, abtest, onNameChange, onSubmit }) {
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
                <div className="relative col-xs-4" key={key}>
                    <AbTestGroupForm onSlugChange={onGroupSlugChange} onNameChange={onGroupNameChange} abtestGroup={abtestGroup} />
                    <i className="abs-top-right text-danger close" onClick={handleRemove}><span aria-hidden="true">&times;</span></i>
                </div>
            )

        });

        groupsMarkup = (
            <div className="row">
                {groupsMarkup}
            </div>
        );
    }

    function onSuggestedSampleSizeClick() {
        onSampleSizeChange(statsData.sampleSize);
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
                    <header>
                        <h3 className="inline">Target Sample Size </h3>
                        <div className="relative inline">
                            <label htmlFor="suggested-sample-size-fields-input" className="cursor-pointer"><small>(Calculate Minimum Suggested Sample Size)</small></label>
                            <input id="suggested-sample-size-fields-input" type="checkbox" className="hidden checkbox-visible-input" />
                            <div className="checkbox-visible-content suggested-sample-size-fields">
                                <label htmlFor="suggested-sample-size-fields-input" className="abs-top-right close"><span aria-hidden="true">&times;</span></label>
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
                                <h4 />
                                Suggested Samples Size: <strong className="cursor-pointer" onClick={onSuggestedSampleSizeClick}>{numeral(statsData.sampleSize).format('0,0')}</strong>
                            </div>
                        </div>
                    </header>
                    <div className="input-group">
                        <NumberFormControl id="sample-size-input" format="0,0" className="form-control" value={abtest.get('sampleSize')} onChange={onSampleSizeChange} />
                        <span className="input-group-addon">Impressions</span>
                    </div>
                    <h6>Estimated Cost: {numeral(projectedCost.get('cost')).format('$0,0.00')}</h6>
                </section>

                <hr />
                <section>
                    <h3>Control Group</h3>
                    <AbTestGroupForm onSlugChange={onGroupSlugChange} onNameChange={onGroupNameChange} abtestGroup={controlGroup} />
                </section>

                <hr />
                <section>
                    <header>
                        <div className="row">
                            <div className="col-xs-6">
                                <h3 className="no-margin-top">A/B Test Groups</h3>
                            </div>
                            <div className="col-xs-6">
                                <div className="text-right">
                                    <span onClick={onAddGroupButtonClick} className="btn btn-primary">Add A/B Test Group</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    {groupsMarkup}
                </section>

                <hr />
                <footer className="text-right">
                    <input type="submit" className="btn btn-primary" value="Create A/B Test" />
                </footer>

            </form>
        </div>
    );
}
