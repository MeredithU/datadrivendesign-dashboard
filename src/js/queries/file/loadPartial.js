'use strict';

const loadFile = require('./loadFile');

module.exports = function (path) {
    const partialPath = `${__dirname}/../../../partial/${path}`;

    return loadFile(partialPath);
}
