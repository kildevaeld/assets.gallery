import { CollectionView, CollectionViewOptions, View } from 'views';
export interface AssetsListOptions extends CollectionViewOptions {
    deleteable?: boolean;
}
export declare const AssetsListItem: {};
export declare const AssetsEmptyView: {};
export declare class AssetsListView extends CollectionView<HTMLDivElement> {
    _current: View<HTMLDivElement>;
    private _blazy;
    constructor(options?: AssetsListOptions);
    onRenderCollection(): void;
    _initBlazy(): void;
}
