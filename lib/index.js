"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const views = require('views');
__export(require('./fileuploader'));
__export(require('./models'));
__export(require('./ui'));
__export(require('./client'));
class View extends views.View {
}
exports.View = View;
const client_2 = require('./client');
function createClient(options) {
    return new client_2.AssetsClient(options);
}
exports.createClient = createClient;
