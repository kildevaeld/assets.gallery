"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var views_1 = require('views');
var assets_preview_1 = require('../assets-preview');
var AudioPreview = (function (_super) {
    __extends(AudioPreview, _super);
    function AudioPreview() {
        _super.apply(this, arguments);
        this.template = function (data) {
            return "\n\t\t\t<audio controls>\n\t\t\t\t<source src=\"" + this.model.getURL() + "\" type=\"" + data.mime + "\" />\n\t\t\t</audio>\n\t\t";
        };
    }
    return AudioPreview;
}(views_1.View));
exports.AudioPreview = AudioPreview;
assets_preview_1.setPreviewHandler(['audio/mpeg', 'audio/wav', 'audio/ogg'], AudioPreview);
