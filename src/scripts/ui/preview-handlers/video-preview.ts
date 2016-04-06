import {View} from 'views';
import {setPreviewHandler} from '../assets-preview';
import {AssetsModel} from '../../models';

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

setPreviewHandler(['video/mp4', 'video/ogg', 'video/webm', 'video/x-m4v'], VideoPreview);
