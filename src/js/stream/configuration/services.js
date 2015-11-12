'use strict';

import rx from 'rx';

import servicesConfig from 'config/services.json!';

export default rx.Observable.return(servicesConfig);