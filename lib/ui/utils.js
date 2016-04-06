"use strict";
var templates_1 = require('./templates');
function template(name) {
    return function (target) {
        var t;
        if (!(t = templates_1.default[name])) {
            throw new Error('could not find template: ' + name);
        }
        target.prototype.template = t;
    };
}
exports.template = template;
