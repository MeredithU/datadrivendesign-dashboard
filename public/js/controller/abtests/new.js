'use strict';

import rx from 'rx';
import _ from 'lodash';

// Util
import abtestCalculator from 'abtest-calculator';
const calculateSampleSizeFromBaselineConversionRate = abtestCalculator.calculateSampleSizeFromBaselineConversionRate;

// Action
import createAbTest from 'dashboard/action/abtest/create';

// Model
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


    return rx.Observable.create(function (o) {
        let controlGroup = initialGroup;

        function next () {
            const sampleSize = calculateSampleSizeFromBaselineConversionRate(statsData.baseline / 100, statsData.minDetectableEffect / 100);

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

        function onSuggestedSampleSizeClick () {
            abtest.set('sampleSize', statsData.sampleSize);
            next();
        }

        function onNameChange (e) {
            abtest.set('name', e.target.value);
            next();
        }

        function onSampleSizeChange (sampleSize) {
            abtest.set('sampleSize', sampleSize);
            next();
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
            onControlGroupChange,
            controlGroup,
            onGroupSlugChange,
            onGroupNameChange,
            onSuggestedSampleSizeClick,
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

    .map((props) => {
        return newAbtestView(props);
    })
}
