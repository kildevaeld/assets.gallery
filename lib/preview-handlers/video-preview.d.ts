import { View } from 'views';
import { AssetsModel } from '../assets-collection';
export declare class VideoPreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template: (data: any) => string;
}
