import { EventEmitter } from 'eventsjs';
import * as utils from 'utilities';
import { HttpMethod } from './interface';
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
export default class FileUploader extends EventEmitter {
    options: FileUploaderOptions;
    constructor(options: FileUploaderOptions);
    upload(file: File, progressFn?: FileUploadProgress, attributes?: Object): utils.IPromise<Object>;
    validateFile(file: File): void;
}
