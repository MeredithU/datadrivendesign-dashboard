'use strict';

import rx from 'rx';

// Model
import AbTest from 'dashboard/model/abtest';
import AbTestGroup from 'dashboard/model/abtestGroup';
import AbTestState from 'dashboard/model/abtestState';
import AbTestResult from 'dashboard/model/abtestResult';

export default function (resp) {
    const abtestData = resp.data;

    return rx.Observable.create(function (o) {
        const abtestResponse = {};
        const attributes = abtestData.attributes;
        attributes.id = abtestData.id;

        const abtest = abtestResponse.abtest = AbTest.create(attributes);

        const abtestGroups = abtestResponse.abtestGroups = abtestData.relationships.abtestGroup.map((abtestGroupData) => {
            const abtestGroup = AbTestGroup.create(abtestGroupData.attributes);
            abtestGroup.set('id', abtestGroupData.id);

            const meta = abtestGroupData.meta;

            return {
                abtestGroup,
                meta
            }
        });

        const abtestStateAttrs = abtestData.relationships.abtestState.data;
        const abtestState = AbTestState.create(abtestStateAttrs);
        const abtestControlGroup = {
            abtestGroup: AbTestGroup.create(abtestData.relationships.abtestGroupControl.attributes),
            meta: abtestData.relationships.abtestGroupControl.meta
        }
        abtestControlGroup.abtestGroup.set('id', abtestData.relationships.abtestGroupControl.id);
        abtestResponse.abtestControlGroup = abtestControlGroup;
        abtestResponse.abtestState = abtestState;

        let abtestResult = null;

        if (abtestData.included.abtestResults && abtestData.included.abtestResults.attributes) {
            abtestResult = AbTestResult.create(abtestData.included.abtestResults.attributes);
            abtestResult.winner = abtestGroups.filter((abtestGroup) => {
                return (abtestGroup.abtestGroup.get('id') === abtestResult.get('winner_id'));
            })
            .map((a) => {
                return a.abtestGroup;
            })[0];
        }

        abtestResponse.abtestResult = abtestResult;

        o.onNext(abtestResponse);
        o.onCompleted();

    });

}
