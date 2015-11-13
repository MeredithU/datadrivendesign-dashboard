'use strict';

import rx from 'rx';

// Util
import abtestCalculator from 'data-driven-design-ab-test-calculator';

// Action
import createAbTest from 'dashboard/action/abtest/create';

// Model
import AbTest from 'dashboard/model/abtest';

// View
import newAbtestView from 'dashboard/view/abtests/new';

export default function (route) {
    const abtest = AbTest.create({
        name: '',
        sampleSize: 0
    });

    const groups = [];


    return rx.Observable.create(function (o) {

        function next () {
            o.onNext(props);
        }

        function onNameChange (e) {
            abtest.set('name', e.target.value);
            next();
        }

        function onSampleSizeChange (e) {
            abtest.set('sampleSize', parseInt(e.target.value));
            next();
        }

        function onSubmit (e) {
            e.preventDefault();
            
            createAbTest(abtest)
                .subscribe(
                    function (resp) {
                        console.log('resp', resp);
                    },

                    function (err) {
                        console.log('err', err);
                    }
                )
        }

        const props = {
            onSampleSizeChange,
            onSubmit,
            abtest,
            onNameChange
        };

        next();

    })

    .map((props) => {
        return newAbtestView(props);
    })
}