import { LayoutView, ViewOptions } from 'views';
import { IDataView } from 'views';
import { AssetsModel } from '../models';
export interface PreviewInfoOptions extends ViewOptions {
}
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
