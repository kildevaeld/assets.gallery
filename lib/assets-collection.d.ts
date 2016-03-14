import { RestModel, RestCollection } from 'collection';
export declare class AssetsModel extends RestModel {
    idAttribute: string;
    collection: AssetsCollection;
    fullPath: string;
    getURL(): string;
}
export declare class AssetsCollection extends RestCollection<AssetsModel> {
    Model: typeof AssetsModel;
    comparator: string;
}
