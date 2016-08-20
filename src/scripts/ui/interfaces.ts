import {ViewOptions, IDataView} from 'views';

export type PreviewHandlerConstructor = new (options: ViewOptions) => IDataView

var previewHandlers: { [key: string]: PreviewHandlerConstructor } = {};

function setPreviewHandler(mime: string | string[], view: PreviewHandlerConstructor) {
    if (!Array.isArray(mime)) {
        mime = [<string>mime];
    }
    (<string[]>mime).forEach(function(m) {
        previewHandlers[m] = view;
    });
}

export function getPreviewHandler(mime: string): PreviewHandlerConstructor {
    let reg: RegExp, k: string;
    for (k in previewHandlers) {
        if ((new RegExp(k)).test(mime)) return previewHandlers[k];
    }
    return null;
}

export function preview(...mimetypes:string[]): ClassDecorator {
    return function(target:PreviewHandlerConstructor) {
        setPreviewHandler(mimetypes, target);
    }
}