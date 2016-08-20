import {View} from 'views'
import {preview} from '../interfaces'
import {AssetsModel} from '../../models'

@preview('audio/mpeg', 'audio/wav', 'audio/ogg')
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

