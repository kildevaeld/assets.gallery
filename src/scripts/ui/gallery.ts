
import {BaseObject, ViewOptions, LayoutView, CollectionView, attributes} from 'views';
import {AssetsListView} from './list';
import {AssetsPreview} from './assets-preview';
import {AssetsCollection, AssetsModel} from '../models';
import {UploadButton} from './filebutton';
import * as utils from 'orange/browser';
import templates from './templates';

import {AssetsClient} from '../client';

import {template} from './utils';


export interface GalleryViewOptions extends ViewOptions {
    uploadButton?: boolean;
    //collection?: AssetsCollection;
    //url?: string;
    maxSize?: number;
    removeable?: boolean;
    mimeType?: string[]|string;
}

@template('gallery')
@attributes({
    className: 'assets-gallery gallery',
    tagName: 'div',
    ui: {
        button: '.upload-button',
        //search : ".assets-search-input" 
    },
    events: {
        'change @ui.search': '_onSearch'
    }
})
export class GalleryView extends LayoutView<HTMLDivElement> {
    public collection: AssetsCollection;
    public selected: AssetsModel;
    private _listView: AssetsListView;
    private _preView: AssetsPreview;
    private _uploadButton: UploadButton;
    private _client: AssetsClient;
    
    get options (): GalleryViewOptions {
        return this._options;
    }
    
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

    constructor(client:AssetsClient, options: GalleryViewOptions = {}) {
        (<any>options).regions = {
            list: '.gallery-list',
            preview: '.gallery-preview'
        }


        super(options);
        
        this._options = options;
        this._client = client;
        
        this.collection = client.getCollection();

        this._listView = new AssetsListView({
            collection: this.collection,
            deleteable: true
        });

        this._preView = new AssetsPreview();

        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove)
        this.listenTo(this._listView, 'dblclick',() => {
            this.trigger('dblclick');
        });
   
       
    }

    onRender() {
        
        this.regions['list'].show(this._listView);
        this.regions['preview'].show(this._preView)
        
        
        if (this.options.uploadButton) {
            this._uploadButton = new UploadButton({
                el: this.ui['button'],
                autoUpload: true,
                url: this._client.url,
                maxSize: this.options.maxSize||1024 * 1000,
                //mimeType: 'image/*'
                mimeType: this.options.mimeType
                });
            this.listenTo(this._client, 'change:url', () => {
                this._uploadButton.url = this._client.url;
            });
            
            this.listenTo(this._uploadButton, 'upload', this._onItemCreate);
            this.listenTo(this._uploadButton, 'progress', this._onUploadProgress);
            this._uploadButton.render();
        }
        
        
       
        
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
                }, 1000);
            }, 600);
            
            elm.style.opacity = '0';
            
            //this.$('.upload-progress')[0].style.width = 0 + '%';
            //this.$('.upload-progress')[0].style.display = 'block';
        }, 800);
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
        if (this._preView.model === model) {
            this._preView.model = null;
        }
    }


    private _onSearch() {
        let search = <HTMLInputElement>this.ui['search'];
        this.collection.query(search.value).catch(e => {
            console.log(e)
        });
    }

}