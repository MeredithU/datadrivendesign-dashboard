'use strict';

const fs = require('fs');
const path = './dist/public/config/services.json';
const env = process.env;
/*

export ABTEST_HTTP_API_PROTOCOL=http
export ABTEST_HTTP_API_HOSTNAME=localhost
export ABTEST_HTTP_API_PORT=4000
export ABTEST_HTTP_API_BASEPATH=''

*/

const services = {
    "abtest": {
        "protocol": env.ABTEST_HTTP_API_PROTOCOL,
        "hostname": env.ABTEST_HTTP_API_HOSTNAME,
        "port": parseInt(env.ABTEST_HTTP_API_PORT),
        "basePath": env.ABTEST_HTTP_API_BASEPATH
    }
};

const content = JSON.stringify(services, null, 1);


fs.writeFile(path, content);
