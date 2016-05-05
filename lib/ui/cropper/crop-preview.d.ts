import { View } from 'views';
import { ICropping } from './interfaces';
export declare class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;
    cropping: ICropping;
    render(): this;
    update(): this;
}
