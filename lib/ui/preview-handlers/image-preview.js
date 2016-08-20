"use strict";
const views_1 = require('views');
const interfaces_1 = require('../interfaces');
interfaces_1.preview('image/*');
class ImagePreview extends views_1.View {
    constructor(...args) {
        super(...args);
        this.template = function (data) {
            return `<img src="${this.model.getURL()}"/>`;
        };
    }
}
exports.ImagePreview = ImagePreview;
