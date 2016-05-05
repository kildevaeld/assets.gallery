/// <reference path="../../../../typings/main.d.ts" />
import { View, ViewOptions } from 'views';
import { ICropper, ICropping } from './interfaces';
import { CropPreView } from './crop-preview';
export interface CropViewOptions extends ViewOptions {
    aspectRatio?: number;
    resize: boolean;
    preview?: CropPreView;
}
export declare class CropView extends View<HTMLDivElement> {
    private _cropper;
    protected _cropping: ICropping;
    options: CropViewOptions;
    cropper: ICropper;
    cropping: ICropping;
    setModel(model: any): this;
    constructor(options?: CropViewOptions);
    activate(): this;
    deactivate(): this;
    toggle(): this;
    onCrop(cropping: any): void;
    render(): this;
    destroy(): void;
}
