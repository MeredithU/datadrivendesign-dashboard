'use strict';

import rx from 'rx';

// Model
import AbTest from 'dashboard/model/abtest';
import AbTestGroup from 'dashboard/model/abtestGroup';

export default function (resp) {
    const indexResponse = [];

    return rx.Observable.create(function (o) {
        resp.data.forEach((abtestData) => {
            const abtestResponse = {};

            const attributes = abtestData.attributes;
            attributes.id = abtestData.id;

            const abtest = abtestResponse.abtest = AbTest.create(attributes);

            const abtestGroups = abtestResponse.abtestGroups = abtestData.relationships.abtestGroups.data.map((abtestGroupData) => {
                const abtestGroup = AbTestGroup.create(abtestGroupData.data);
                const meta = abtestGroupData.meta;

                return {
                    abtestGroup,
                    meta
                }
            });

            o.onNext(abtestResponse);
        });

        o.onCompleted();

    });

}