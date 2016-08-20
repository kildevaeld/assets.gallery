"use strict";
const views_1 = require('views');
const interfaces_1 = require('../interfaces');
interfaces_1.preview('video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v');
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
