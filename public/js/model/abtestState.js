'use strict';

import model from 'dashboard/model/model';

export default {

    create (attributes = {}) {

        const abtestState = model.create(attributes);

        abtestState.STATUS_ACTIVE = 'active';
        abtestState.STATUS_COMPLETE = 'complete';

        abtestState.isActive = function () {
            return abtestState.get('status') === abtestState.STATUS_ACTIVE;
        };

        abtestState.isComplete = function () {
            return abtestState.get('status') === abtestState.STATUS_COMPLETE;
        };

        return abtestState;

    }

}
