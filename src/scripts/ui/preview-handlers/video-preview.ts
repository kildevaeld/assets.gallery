import {View} from 'views';
import {preview} from '../interfaces';
import {AssetsModel} from '../../models';

preview('video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v')
export class VideoPreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template = function (data:any): string {
        return `
			<video controls>
				<source src="${this.model.getURL()}" type="${data.mime}" />
			</video>
		`;
    }
}
