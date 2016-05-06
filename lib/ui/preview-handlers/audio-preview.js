"use strict";
const views_1 = require('views');
const assets_preview_1 = require('../assets-preview');
class AudioPreview extends views_1.View {
    constructor(...args) {
        super(...args);
        this.template = function (data) {
            return `
			<audio controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</audio>
		`;
        };
    }
}
exports.AudioPreview = AudioPreview;
assets_preview_1.setPreviewHandler(['audio/mpeg', 'audio/wav', 'audio/ogg'], AudioPreview);
