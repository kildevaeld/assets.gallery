import {View} from 'views'
import {setPreviewHandler} from '../assets-preview'
import {AssetsModel} from '../assets-collection'

export class ImagePreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template = function (data:any): string {
        return `<img src="${this.model.getURL()}"/>`;
    }
}

setPreviewHandler(['image/*'], ImagePreview);
