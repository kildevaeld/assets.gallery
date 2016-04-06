import { CollectionView, CollectionViewOptions, View } from 'views';
export interface AssetsListOptions extends CollectionViewOptions {
    deleteable?: boolean;
}
export declare const AssetsEmptyView: {};
export declare class AssetsListView extends CollectionView<HTMLDivElement> {
    _current: View<HTMLDivElement>;
    private _blazy;
    private index;
    constructor(options?: AssetsListOptions);
    onRenderCollection(): void;
    private _onSroll(e);
    private _initBlazy();
}
