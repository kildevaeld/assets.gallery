import {View} from 'views';
import {preview} from '../interfaces';
import {AssetsModel} from '../../models';

preview('image/*')
export class ImagePreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template = function (data:any): string {
        return `<img src="${this.model.getURL()}"/>`;
    }
}
