import { View } from 'views';
import { AssetsModel } from '../../models';
export declare class AudioPreview extends View<HTMLDivElement> {
    model: AssetsModel;
    template: (data: any) => string;
}
