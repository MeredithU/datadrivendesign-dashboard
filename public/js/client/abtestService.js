'use strict';

import _ from 'lodash';


import requestAbTest from 'dashboard/action/requestAbTest';

// Stream
import abTestServiceConfigStream from 'dashboard/stream/configuration/abtestService';

const abtestService = {

    send (request) {
        const params = _.omit(request, 'path');

        return requestAbTest(request.path, params);

    }

};

export default abtestService;