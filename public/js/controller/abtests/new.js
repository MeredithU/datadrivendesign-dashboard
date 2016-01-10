'use strict';

import rx from 'rx';
import _ from 'lodash';

// Util
import abtestCalculator from 'abtest-calculator';
const calculateSampleSizeFromBaselineConversionRate = abtestCalculator.calculateSampleSizeFromBaselineConversionRate;

// Stream
import costPerUnitStream from 'dashboard/stream/pricing/costPerUnit';

// Action
import createAbTest from 'dashboard/action/abtest/create';

// Model
import Model from 'dashboard/model/model';
import AbTest from 'dashboard/model/abtest';
import AbTestGroup from 'dashboard/model/abtestGroup';

// View
import newAbtestView from 'dashboard/view/abtests/new';

export default function (route) {
    const abtest = AbTest.create({
        name: '',
        sampleSize: 0
    });

    const statsData = {
        baseline: 10,
        minDetectableEffect: 1,
        sampleSize: 0
    };

    const initialGroup = AbTestGroup.create({
        name: 'Control Group',
        slug: 'control'
    });

    const abtestGroups = [initialGroup];

    return costPerUnitStream.flatMapLatest((costPerUnit) => {

        return rx.Observable.create(function (o) {
            let controlGroup = initialGroup;
            let projectedCost = Model.create({
                cost: 0
            });

            function next () {
                const sampleSize = calculateSampleSizeFromBaselineConversionRate(statsData.baseline / 100, statsData.minDetectableEffect / 100);
                projectedCost.set('cost', (abtest.get('sampleSize') / 1000) * costPerUnit);

                statsData.sampleSize = parseInt(sampleSize);

                o.onNext(props);
            }

            function onGroupSlugChange (group, value) {
                group.set('slug', value);
                next();
            }

            function onGroupNameChange (group, value) {
                group.set('name', value);
                group.set('slug', _.kebabCase(value));
                next();
            };

            function updateSampleSize (sampleSize) {
                abtest.set('sampleSize', sampleSize);
                next();
            }

            function onNameChange (e) {
                abtest.set('name', e.target.value);
                next();
            }

            function onSampleSizeChange (sampleSize) {
                updateSampleSize(sampleSize);
            }

            function onBaselineChange (baseline) {
                statsData.baseline = baseline;
                next();
            }

            function onMinDetectableEffectChange (minDetectableEffect) {
                statsData.minDetectableEffect = minDetectableEffect;
                next();
            }

            function onAddGroupButtonClick () {
                const abtestGroup = AbTestGroup.create({
                    slug:''
                });

                abtestGroups.push(abtestGroup);
                next();
            }

            function onRemoveAbTestGroupClick (abtestGroup) {
                const index = abtestGroups.indexOf(abtestGroup);

                abtestGroups.splice(index, 1);
                next();
            }

            function onControlGroupChange (abtestGroup) {
                props.controlGroup = controlGroup = abtestGroup;
                next();
            }

            function onSubmit (e) {
                e.preventDefault();
                const groupsWithoutControl = abtestGroups.filter((group) => {
                    return group !== controlGroup;
                });

                createAbTest(abtest, controlGroup, groupsWithoutControl)
                    .subscribe(
                        function (resp) {
                            window.location.hash = '/';
                        },

                        function (err) {
                            console.log('err', err);
                        }
                    )
            }

            const props = {
                projectedCost,
                onControlGroupChange,
                controlGroup,
                onGroupSlugChange,
                onGroupNameChange,
                onRemoveAbTestGroupClick,
                onAddGroupButtonClick,
                abtestGroups,
                statsData,
                onSampleSizeChange,
                onSubmit,
                abtest,
                onNameChange,
                onBaselineChange,
                onMinDetectableEffectChange
            };

            next();

        })
    })

    .map((props) => {
        return newAbtestView(props);
    })
}
