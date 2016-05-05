/// <reference path="../../../../typings/main.d.ts" />
import { View, ViewOptions } from 'views';
import { ICropper, ICropping } from './interfaces';
export interface CropViewOptions extends ViewOptions {
    aspectRatio?: number;
    resize: boolean;
}
export declare class CropView extends View<HTMLDivElement> {
    private _cropper;
    protected _cropping: ICropping;
    options: CropViewOptions;
    cropper: ICropper;
    cropping: ICropping;
    constructor(options?: CropViewOptions);
    activate(): this;
    deactivate(): this;
    render(): this;
}
