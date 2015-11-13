'use strict';


export default {

    create (attributes = {}) {

        const model = new Map();

        Object.keys(attributes).forEach(function (key) {
            model.set(key, attributes[key]);
        });

        model.asJSON = function () {
            const json = {};

            model.forEach(function (key, value) {
                json[key] = value;
            });

            return json;
        };

        return model;

    }

}