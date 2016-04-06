import { LayoutView, View, ViewOptions } from 'views';
import { IDataView } from 'views/lib/types';
import { AssetsModel } from '../models';
export interface PreviewInfoOptions extends ViewOptions {
}
export declare var AssetsInfoPreview: typeof View;
export declare type PreviewHandlerConstructor = new (options: ViewOptions) => IDataView;
export declare function setPreviewHandler(mime: string | string[], view: PreviewHandlerConstructor): void;
export declare function getPreviewHandler(mime: string): PreviewHandlerConstructor;
export interface AssetsPreviewOptions extends ViewOptions {
    infoView?: new (options?: PreviewInfoOptions) => IDataView;
    infoViewOptions?: PreviewInfoOptions;
}
export declare class AssetsPreview extends LayoutView<HTMLDivElement> {
    private infoView;
    setModel(model: AssetsModel): this;
    constructor(options?: AssetsPreviewOptions);
    onRender(): void;
    hideInfoView(hide?: boolean): void;
}
