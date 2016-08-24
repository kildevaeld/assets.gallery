import { EventEmitter } from 'eventsjs';
import { IPromise } from 'utilities';
import { AssetsCollection, AssetsModel } from './models/index';
export interface AssetsClientOptions {
    url?: string;
}
export declare class AssetsClient extends EventEmitter {
    toModel(attr: any): AssetsModel;
    private __options;
    options: any;
    url: string;
    constructor(options?: AssetsClientOptions);
    getCollection(): AssetsCollection;
    getById(id: any): IPromise<AssetsModel>;
    getByPath(path: string): IPromise<AssetsModel>;
}
