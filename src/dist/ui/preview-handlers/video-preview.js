"use strict";
const views_1 = require('views');
const assets_preview_1 = require('../assets-preview');
class VideoPreview extends views_1.View {
    constructor(...args) {
        super(...args);
        this.template = function (data) {
            return `
			<video controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</video>
		`;
        };
    }
}
exports.VideoPreview = VideoPreview;
assets_preview_1.setPreviewHandler(['video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v'], VideoPreview);
