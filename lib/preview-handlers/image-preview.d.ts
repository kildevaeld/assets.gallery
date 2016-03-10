import { View } from 'views';
import { AssetsModel } from '../assets-collection';
export declare class ImagePreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template: (data: any) => string;
}
