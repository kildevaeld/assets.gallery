import {View} from 'views'
import {setPreviewHandler} from '../assets-preview'
import {AssetsModel} from '../assets-collection'

export class AudioPreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template = function (data:any): string {
        return `
			<audio controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</audio>
		`;
    }
}

setPreviewHandler(['audio/mpeg', 'audio/wav', 'audio/ogg'], AudioPreview);
