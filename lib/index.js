"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('whatwg-fetch');
const views = require('views');
__export(require('./fileuploader'));
__export(require('./models/index'));
__export(require('./ui/index'));
__export(require('./client'));
class View extends views.View {
}
exports.View = View;
const client_2 = require('./client');
function createClient(options) {
    return new client_2.AssetsClient(options);
}
exports.createClient = createClient;
