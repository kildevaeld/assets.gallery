import {LayoutView, View, ViewOptions, events, attributes} from 'views';
import {IDataView} from 'views';
import {truncate, humanFileSize} from '../utilities';
import {addClass} from 'orange.dom';
import {AssetsModel} from '../models';
import {Thumbnailer, MimeList} from './thumbnailer';
import templates from './templates';

import {getPreviewHandler} from './interfaces';

export interface PreviewInfoOptions extends ViewOptions { }


@attributes({
    ui: {
        name: '.name',
        mime: '.mimetype',
        size: '.size',
        download: '.download'
    },
    events: {
        "click a.remove": "onItemRemove"
    },
    tagName: 'table',
    className: 'info',
    template: templates['preview-info']
})
class AssetsInfoPreview extends View<HTMLTableElement> {
    model: AssetsModel
    onModel(model: AssetsModel) {
        if (model == null) {
            this.clear();
            return;
        }
        this.ui['name'].textContent = model.get('filename')
        this.ui['mime'].textContent = model.get('mime')
        this.ui['size'].textContent = humanFileSize(model.get('size'), true);
        let link = <HTMLAnchorElement>this.ui['download'].querySelector('a');
        
        let url = model.getURL();
        
        View.prototype.setModel.call(this, model);
        link.textContent = model.get('name');
        link.href = url + '?download=true';
    }

    clear() {
        if (this.ui['name']) {
            this.ui['name'].textContent = ""
        }

        if (this.ui['mime']) {
            this.ui['mime'].textContent = "";
        }

        if (this.ui['size']) {
            this.ui['size'].textContent = "";
        }

        if (this.ui['download']) {
            let fp = this.model.fullPath;
            let link = <HTMLAnchorElement>this.ui['download'].querySelector('a')
            link.textContent = fp;
            link.href = fp + '?download=true';
        }
    
    }

    onItemRemove() {
        this.model.remove().then(() => {
            let link = this.ui['download'].querySelector('a');
        });
    }
}

/*export var AssetsInfoPreview: typeof View = View.extend<typeof View>({
    ui: {
        name: '.name',
        mime: '.mimetype',
        size: '.size',
        download: '.download'
    },
    events: {
        "click a.remove": "onItemRemove"
    },
    tagName: 'table',
    className: 'info',
    template: templates['preview-info'],
    setModel(model) {
        if (model == null) return
        this.ui.name.textContent = model.get('filename')
        this.ui.mime.textContent = model.get('mime')
        this.ui.size.textContent = humanFileSize(model.get('size'), true);
        let link = this.ui.download.querySelector('a');
        
        let url = model.getURL();
        
        View.prototype.setModel.call(this, model);
        link.textContent = model.get('name');
        link.href = url + '?download=true';

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
            let fp = this.model.fullPath;
            let link = this.ui.download.querySelector('a')
            link.textContent = fp;
            link.href = fp + '?download=true';
        }
        

    },

    onItemRemove() {
        this.model.remove().then(() => {
            let link = this.ui.download.querySelector('a');
        });
    }
});*/





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
        
        if (model == null) {
            (<any>this.infoView).clear();
            return
        }

        let Handler = getPreviewHandler(model.get('mime'))

        let region = this.regions['preview']
        region.empty()
        
        this.listenTo(model, 'remove', () => {
            region.empty();
            (<any>this.infoView).clear();
        });
        
        if (Handler) {
           
            let view = new Handler({ model: model })
            addClass(view.el, 'preview')
            region.show(view)

        } else {

            let image = new Image();

            let div = document.createElement('div')
            addClass(div, 'preview');

            region.el.innerHTML = ''
            region.el.appendChild(div);

            Thumbnailer.has(model)
                .then((test) => {
                    if (!test) return;
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
            template: templates['preview']
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
