
import {BaseObject, ViewOptions, LayoutView, CollectionView, attributes} from 'views';
import {AssetsListView} from './assets-list';
import {AssetsPreview} from './assets-preview';
import {AssetsCollection, AssetsModel} from './assets-collection';
import {UploadButton} from './filebutton';
import * as utils from 'utilities';
import templates from './templates';

export function template(name: string): ClassDecorator {
    return function <T extends Function>(target: T) {
        let t;
        if (!(t = templates[name])) {
            throw new Error('could not find template: ' + template)
        }
        target.prototype.template = t
    }
}


export interface GalleryViewOptions extends ViewOptions {
    uploadButton?: boolean
    collection?: AssetsCollection
    url?: string
    removeable?: boolean
}

@template('gallery')
@attributes({
    className: 'assets-gallery gallery',
    tagName: 'div',
    ui: {
        button: '.upload-button',
        search : ".assets-search-input" },
    events: {
        'change @ui.search': '_onSearch'
    }
})
export class GalleryView extends LayoutView<HTMLDivElement> {
    public collection: AssetsCollection
    public selected: AssetsModel
    private _listView: AssetsListView
    private _preView: AssetsPreview
    private _uploadButton: UploadButton

    get listView(): AssetsListView {
        return this._listView
    }

    get preView(): AssetsPreview {
        return this._preView
    }
    
    get url (): string {
        return this.collection.getURL();
    }
    
    set url(url: string) {
        this.collection.url = url;
        this._uploadButton.url = url;
    }

    constructor(options: GalleryViewOptions = {}) {
        (<any>options).regions = {
            list: '.gallery-list',
            preview: '.gallery-preview'/*,
            upload: '.gallery-upload'*/
        }

        if (!options.url && !options.collection) {
            throw new Error('either specify url or collection');
        }

        super(options);

        let collection = options.collection ? options.collection : new AssetsCollection(null, {
            url: options.url
        });

        this.collection = collection

        this._listView = new AssetsListView({
            collection: collection,
            deleteable: true
        });

        this._preView = new AssetsPreview();


        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove)
       
    }

    onRender() {
        this.regions['list'].show(this._listView);
        this.regions['preview'].show(this._preView)
        
        
        this._uploadButton = new UploadButton({
          el: this.ui['button'],
          autoUpload: true,
          url: this.collection.getURL(),
          maxSize: 1024 * 1000,
          //mimeType: 'image/*'
        });
        
        this.listenTo(this._uploadButton, 'upload', this._onItemCreate);
        this.listenTo(this._uploadButton, 'progress', this._onUploadProgress);
        this._uploadButton.render();
        
    }
    
    private _onUploadProgress (e) {
        
        let p = Math.round((e.progress / e.total) * 100);
        
        this.$('.upload-progress')[0].style.width = p + '%';
        
    }

    private _onItemCreate(asset) {
        setTimeout(() => {
            let elm: HTMLElement = this.$('.upload-progress')[0];
            utils.transitionEnd(elm, (e) => {
                
                elm.style.width = '0';
                utils.transitionEnd(elm, e => {
                    elm.style.opacity = '1'
                }, 1000)
                
                
            }, 600);
            
            elm.style.opacity = '0';
            
            //this.$('.upload-progress')[0].style.width = 0 + '%';
            //this.$('.upload-progress')[0].style.display = 'block';
        }, 800)
        this.collection.on('error', (e) => {
            console.log(e);
        });
        try {
            this.collection.add(asset, {silent: false, parse: true});
           
        } catch (e) {
            console.log(e);
        }


    }

    private _onItemSelect({model}) {
        if (this._preView.model === model) return;

        this._preView.model = model
        this.selected = model
    }

    private _onItemRemove({model}) {

    }


    private _onSearch() {
        let search = <HTMLInputElement>this.ui['search'];
        this.collection.query(search.value).catch(e => {
            console.log(e)
        });
    }

}