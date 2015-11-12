'use strict';

import rx from 'rx';
import servicesConfigStream from 'dashboard/stream/configuration/services';

export default servicesConfigStream.map((config) => {
    return config.userManagement;
});