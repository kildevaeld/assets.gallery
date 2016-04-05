import FileUploader from './fileuploader';
import { ViewOptions, View } from 'views';
export interface IProgressView {
    show(): any;
    hide(): any;
    setProgress(progress: number, total: number, percent: number): any;
}
export interface IMessageView {
    show(): any;
    hide(): any;
    setMessage(msg: string): any;
}
export interface UploadButtonOptions extends ViewOptions {
    maxSize?: number;
    mimeType?: string[] | string;
    autoUpload?: boolean;
    url: string;
    progressView?: IProgressView;
    errorView?: IMessageView;
    uploader?: FileUploader;
}
export declare function createButton(options: UploadButtonOptions): any;
export declare class UploadButton extends View<HTMLInputElement> {
    options: UploadButtonOptions;
    progressView: IProgressView;
    errorView: IMessageView;
    private uploader;
    url: string;
    constructor(options: UploadButtonOptions);
    onRender(): void;
    private _onChange(e);
    private upload(file);
    private clear();
    private showErrorMessage(error);
    private hideErrorView();
    private showProgress(progress, total);
}
