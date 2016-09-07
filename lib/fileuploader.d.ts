import { EventEmitter } from 'eventsjs';
import { HttpMethod } from 'orange.request';
import { IPromise } from 'orange';
export interface FileUploaderOptions {
    url: string;
    method?: HttpMethod;
    maxSize?: number;
    mimeType?: string[] | string;
    parameter?: string;
}
export declare type FileUploadResult = any;
export interface FileUploadProgress {
    (progress: number, total: number): any;
}
export declare class FileUploader extends EventEmitter {
    options: FileUploaderOptions;
    constructor(options: FileUploaderOptions);
    upload(file: File, progressFn?: FileUploadProgress, attributes?: Object): IPromise<Object>;
    validateFile(file: File): void;
}
