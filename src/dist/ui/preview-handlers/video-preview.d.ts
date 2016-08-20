import { View } from 'views';
import { AssetsModel } from '../../models';
export declare class VideoPreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template: (data: any) => string;
}
