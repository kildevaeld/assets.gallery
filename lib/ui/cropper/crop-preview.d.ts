import { View } from 'views';
import { ICropping } from './interfaces';
export declare class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;
    private size;
    cropping: ICropping;
    render(): this;
    update(): this;
    private _onImageLoad();
}
