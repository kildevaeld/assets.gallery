"use strict";
const views_1 = require('views');
const assets_preview_1 = require('../assets-preview');
class ImagePreview extends views_1.View {
    constructor(...args) {
        super(...args);
        this.template = function (data) {
            return `<img src="${this.model.getURL()}"/>`;
        };
    }
}
exports.ImagePreview = ImagePreview;
assets_preview_1.setPreviewHandler(['image/*'], ImagePreview);
