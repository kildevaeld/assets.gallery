
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

        /*this._uploadButton = new UploadButton({
            el: this.ui['button'],
            autoUpload: true,
            url: collection.url,
            maxSize: 1024 * 1000,
            //mimeType: 'image/*'
        });*/

        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove)
        //this.listenTo(this._uploadButton, 'upload', this._onItemCreate);
        
        this.collection = collection
    }

    onRender() {
        this.regions['list'].show(this._listView);
        this.regions['preview'].show(this._preView)
        //this.regions['upload'].show(this._uploadButton)
        this._uploadButton = new UploadButton({
            el: this.ui['button'],
            autoUpload: true,
            url: this.collection.url,
            maxSize: 1024 * 1000,
            //mimeType: 'image/*'
        });
        
        this.listenTo(this._uploadButton, 'upload', this._onItemCreate);

    }

    private _onItemCreate(asset) {
        this.collection.on('error', (e) => {
            console.log(e);
        });
        try {
            this.collection.add(asset);    
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