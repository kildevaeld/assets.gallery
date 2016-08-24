import { View } from 'views';
import { AssetsModel } from '../../models/index';
export declare class AssetsListItemView extends View<HTMLDivElement> {
    model: AssetsModel;
    onRender(): void;
    private _onClick(e);
    private _onDblClick(e);
}
