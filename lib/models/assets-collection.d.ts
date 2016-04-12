import { RestModel, RestCollection } from 'collection';
import { AssetsClient } from '../client';
export interface IAsset {
    filename: string;
    path: string;
    mime: string;
    size: number;
    meta: {
        [key: string]: any;
    };
    [key: string]: any;
}
export declare class AssetsModel extends RestModel {
    idAttribute: string;
    collection: AssetsCollection;
    constructor(data: IAsset, options?: any);
    fullPath: string;
    getURL(): string;
    toJSON(): IAsset;
}
export interface AssetsCollectionOptions {
    fetchOnUrl?: boolean;
}
export declare class AssetsCollection extends RestCollection<AssetsModel> {
    Model: typeof AssetsModel;
    comparator: string;
    constructor(client: AssetsClient, options?: AssetsCollectionOptions);
}
