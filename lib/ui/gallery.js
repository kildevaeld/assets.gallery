"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const views_1 = require('views');
const index_1 = require('./list/index');
const assets_preview_1 = require('./assets-preview');
const filebutton_1 = require('./filebutton');
const orange_dom_1 = require('orange.dom');
const client_1 = require('../client');
const utils_1 = require('./utils');
let GalleryView = class GalleryView extends views_1.LayoutView {
    constructor(client, options = {}) {
        options.regions = {
            list: '.gallery-list',
            preview: '.gallery-preview'
        };
        super(options);
        this._options = options;
        this._client = client;
        this.collection = client.getCollection();
        this._listView = new index_1.AssetsListView({
            collection: this.collection,
            deleteable: true
        });
        this._preView = new assets_preview_1.AssetsPreview();
        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove);
        this.listenTo(this._listView, 'dblclick', () => {
            this.trigger('dblclick');
        });
    }
    get options() {
        return this._options;
    }
    get listView() {
        return this._listView;
    }
    get preView() {
        return this._preView;
    }
    get url() {
        return this.collection.getURL();
    }
    set url(url) {
        this.collection.url = url;
        this._uploadButton.url = url;
    }
    onRender() {
        this.regions['list'].show(this._listView);
        this.regions['preview'].show(this._preView);
        if (this.options.uploadButton) {
            this._uploadButton = new filebutton_1.UploadButton({
                el: this.ui['button'],
                autoUpload: true,
                url: this._client.url,
                maxSize: this.options.maxSize || 1024 * 1000,
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
    _onUploadProgress(e) {
        let p = Math.round((e.progress / e.total) * 100);
        this.$('.upload-progress')[0].style.width = p + '%';
    }
    _onItemCreate(asset) {
        setTimeout(() => {
            let elm = this.$('.upload-progress')[0];
            orange_dom_1.transitionEnd(elm, (e) => {
                elm.style.width = '0';
                orange_dom_1.transitionEnd(elm, e => {
                    elm.style.opacity = '1';
                }, 1000);
            }, 600);
            elm.style.opacity = '0';
        }, 800);
        this.collection.on('error', (e) => {
            console.log(e);
        });
        try {
            this.collection.add(asset, { silent: false, parse: true });
        }
        catch (e) {
            console.log(e);
        }
    }
    _onItemSelect({ model }) {
        if (this._preView.model === model)
            return;
        this._preView.model = model;
        this.selected = model;
    }
    _onItemRemove({ model }) {
        if (this._preView.model === model) {
            this._preView.model = null;
        }
    }
    _onSearch() {
        let search = this.ui['search'];
        this.collection.query(search.value).catch(e => {
            console.log(e);
        });
    }
};
GalleryView = __decorate([
    utils_1.template('gallery'),
    views_1.attributes({
        className: 'assets-gallery gallery',
        tagName: 'div',
        ui: {
            button: '.upload-button',
        },
        events: {
            'change @ui.search': '_onSearch'
        }
    }), 
    __metadata('design:paramtypes', [client_1.AssetsClient, Object])
], GalleryView);
exports.GalleryView = GalleryView;
