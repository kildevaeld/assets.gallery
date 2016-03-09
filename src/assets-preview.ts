import {LayoutView, View, ViewOptions, events} from 'views';
import {IDataView} from 'views/lib/types';
import {truncate, humanFileSize} from './utilities';
import * as html from 'utilities/lib/html';
import {AssetsModel} from './assets-collection';
import {PreviewTemplate, PreviewInfoTemplate} from './templates';
import {Thumbnailer, MimeList} from './thumbnailer';

export interface PreviewInfoOptions extends ViewOptions { }

export var AssetsInfoPreview: typeof View = View.extend<typeof View>({
    ui: {
        name: '.name',
        mime: '.mime',
        size: '.size',
        download: '.download'
    },
    events: {
        "click a.remove": "onItemRemove"
    },
    tagName: 'table',
    className: 'info',
    template: PreviewInfoTemplate,
    setModel(model) {
        if (model == null) return
        this.ui.name.textContent = model.get('name')
        this.ui.mime.textContent = model.get('mime')
        this.ui.size.textContent = humanFileSize(model.get('size'), true);
        let link = this.ui.download.querySelector('a');
        
        View.prototype.setModel.call(this, model);
        link.textContent = model.get('url');
        link.href = model.get('url') + '?download=true';

    },


    clear() {
        if (this.ui.name) {
            this.ui.name.textContent = ""
        }

        if (this.ui.mime) {
            this.ui.mime.textContent = "";
        }

        if (this.ui.size) {
            this.ui.size.textContent = "";
        }

        if (this.ui.download) {
            let link = this.ui.download.querySelector('a')
            link.textContent = this.model.get('url');
            link.href = this.model.get('url') + '?download=true';
        }

    },

    onItemRemove() {
        this.model.remove().then(() => {
            let link = this.ui.download.querySelector('a');
        });
    }
});

export type PreviewHandlerConstructor = new (options: ViewOptions) => IDataView

let previewHandlers: { [key: string]: PreviewHandlerConstructor } = {};

export function setPreviewHandler(mime: string | string[], view: PreviewHandlerConstructor) {
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

export interface AssetsPreviewOptions extends ViewOptions {
    infoView?: new (options?: PreviewInfoOptions) => IDataView;
    infoViewOptions?: PreviewInfoOptions;
}


export class AssetsPreview extends LayoutView<HTMLDivElement> {
    //private _model: AssetsModel
    private infoView: IDataView

    setModel(model: AssetsModel): this {
        
        super.setModel(model);

        this.hideInfoView(model == null ? true : false)
        this.infoView.model = model

        let Handler = getPreviewHandler(model.get('mime'))

        let region = this.regions['preview']
        region.empty()
        if (Handler) {
            let view = new Handler({ model: model })
            html.addClass(view.el, 'preview')
            region.show(view)

        } else {


            let image = new Image();

            let div = document.createElement('div')
            html.addClass(div, 'preview');

            region.el.innerHTML = ''
            region.el.appendChild(div);

            Thumbnailer.has(model)
                .then((test) => {
                    image.src = test
                    div.appendChild(image);
                }).catch((e) => {
                    console.log(e)
                });
        }
        
        return this;

    }



    constructor(options: AssetsPreviewOptions = {}) {
        
        let opts = options.infoViewOptions || {};

        super({
            regions: {
                preview: '.preview-region',
                info: '.info-region'
            },
            className: 'assets-preview',
            template: PreviewTemplate
        });
        
        this.infoView = options.infoView ? new options.infoView(opts) : new AssetsInfoPreview(opts)
    }

    onRender() {
        this.regions['info'].show(this.infoView)
        this.hideInfoView()
    }

    hideInfoView(hide: boolean = true) {
        this.infoView.el.style.display = hide ? 'none' : 'table'
    }
}
