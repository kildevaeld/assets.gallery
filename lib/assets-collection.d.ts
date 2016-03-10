import { RestCollectionOptions, RestModel, RestCollection } from 'collection';
export interface AssetsCollectionOptions extends RestCollectionOptions<AssetsModel> {
    url: string;
}
export interface AssetsCollectionFetchOption {
}
export declare class AssetsModel extends RestModel {
    idAttribute: string;
    collection: AssetsCollection;
    getURL(): string;
}
export declare class AssetsCollection extends RestCollection<AssetsModel> {
    Model: typeof AssetsModel;
    comparator: string;
    url: string;
    constructor(models: any, options: AssetsCollectionOptions);
}
