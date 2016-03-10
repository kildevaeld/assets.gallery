"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var views = require('views');
require('./preview-handlers/index');
__export(require('./fileuploader'));
__export(require('./filebutton'));
__export(require('./assets-collection'));
__export(require('./assets-list'));
__export(require('./assets-preview'));
__export(require('./gallery'));
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        _super.apply(this, arguments);
    }
    return View;
}(views.View));
exports.View = View;
