import { View } from 'views';
import { AssetsModel } from '../../models';
export declare class ImagePreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template: (data: any) => string;
}
