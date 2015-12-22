'use strict';

import rx from 'rx';

// Model
import AbTest from 'dashboard/model/abtest';
import AbTestGroup from 'dashboard/model/abtestGroup';
import AbTestState from 'dashboard/model/abtestState';

export default function (resp) {
    const indexResponse = [];

    return rx.Observable.create(function (o) {
        resp.data.forEach((abtestData) => {
            const abtestResponse = {};

            const attributes = abtestData.attributes;
            attributes.id = abtestData.id;

            const abtest = abtestResponse.abtest = AbTest.create(attributes);

            const abtestGroups = abtestResponse.abtestGroups = abtestData.relationships.abtestGroup.data.map((abtestGroupData) => {
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
            abtestResponse.abtestState = abtestState;

            o.onNext(abtestResponse);
        });

        o.onCompleted();

    });

}
