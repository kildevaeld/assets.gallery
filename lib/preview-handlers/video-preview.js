"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var views_1 = require('views');
var assets_preview_1 = require('../assets-preview');
var VideoPreview = (function (_super) {
    __extends(VideoPreview, _super);
    function VideoPreview() {
        _super.apply(this, arguments);
        this.template = function (data) {
            return "\n\t\t\t<video controls>\n\t\t\t\t<source src=\"" + this.model.getURL() + "\" type=\"" + data.mime + "\" />\n\t\t\t</video>\n\t\t";
        };
    }
    return VideoPreview;
}(views_1.View));
exports.VideoPreview = VideoPreview;
assets_preview_1.setPreviewHandler(['video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v'], VideoPreview);
