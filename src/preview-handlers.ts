import {View} from 'views'
import {setPreviewHandler} from './assets-preview'

setPreviewHandler('image/*', View.extend<typeof View>({
    template: function(data) {
        return `<img src="${this.model.getURL()}"/>`;
    }
}));

setPreviewHandler(['audio/mpeg', 'audio/wav', 'audio/ogg'], View.extend<typeof View>({
    template: function(data) {
        return `
			<audio controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</audio>
		`;
    }
}));

setPreviewHandler(['video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v'], View.extend<typeof View>({
    template: function(data) {
        return `
			<video controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</video>
		`;
    }
}))
