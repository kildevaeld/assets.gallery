import { CollectionView, CollectionViewOptions } from 'views';
import { AssetsCollection } from '../../models';
export interface AssetsListOptions extends CollectionViewOptions {
    deleteable?: boolean;
}
export declare const AssetsEmptyView: {};
export declare class AssetsListView extends CollectionView<HTMLDivElement> {
    private _current;
    private _blazy;
    private _timer;
    private index;
    options: AssetsListOptions;
    collection: AssetsCollection;
    constructor(options?: AssetsListOptions);
    private _initEvents();
    onRenderCollection(): void;
    private _onSroll(e);
    private _initBlazy();
    private _initHeight();
    onShow(): void;
}
