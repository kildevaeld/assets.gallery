"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var views_1 = require('views');
var assets_preview_1 = require('../assets-preview');
var ImagePreview = (function (_super) {
    __extends(ImagePreview, _super);
    function ImagePreview() {
        _super.apply(this, arguments);
        this.template = function (data) {
            return "<img src=\"" + this.model.getURL() + "\"/>";
        };
    }
    return ImagePreview;
}(views_1.View));
exports.ImagePreview = ImagePreview;
assets_preview_1.setPreviewHandler(['image/*'], ImagePreview);
