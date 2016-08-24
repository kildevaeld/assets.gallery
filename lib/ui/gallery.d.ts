import { ViewOptions, LayoutView } from 'views';
import { AssetsListView } from './list';
import { AssetsPreview } from './assets-preview';
import { AssetsCollection, AssetsModel } from '../models/index';
import { AssetsClient } from '../client';
export interface GalleryViewOptions extends ViewOptions {
    uploadButton?: boolean;
    maxSize?: number;
    removeable?: boolean;
    mimeType?: string[] | string;
}
export declare class GalleryView extends LayoutView<HTMLDivElement> {
    collection: AssetsCollection;
    selected: AssetsModel;
    private _listView;
    private _preView;
    private _uploadButton;
    private _client;
    options: GalleryViewOptions;
    listView: AssetsListView;
    preView: AssetsPreview;
    url: string;
    constructor(client: AssetsClient, options?: GalleryViewOptions);
    onRender(): void;
    private _onUploadProgress(e);
    private _onItemCreate(asset);
    private _onItemSelect({model});
    private _onItemRemove({model});
    private _onSearch();
}
