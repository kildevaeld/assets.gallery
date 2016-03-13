"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var views_1 = require('views');
var assets_list_1 = require('./assets-list');
var assets_preview_1 = require('./assets-preview');
var assets_collection_1 = require('./assets-collection');
var filebutton_1 = require('./filebutton');
var templates_1 = require('./templates');
function template(name) {
    return function (target) {
        var t;
        if (!(t = templates_1.default[name])) {
            throw new Error('could not find template: ' + template);
        }
        target.prototype.template = t;
    };
}
exports.template = template;
var GalleryView = (function (_super) {
    __extends(GalleryView, _super);
    function GalleryView(options) {
        if (options === void 0) { options = {}; }
        options.regions = {
            list: '.gallery-list',
            preview: '.gallery-preview'
        };
        if (!options.url && !options.collection) {
            throw new Error('either specify url or collection');
        }
        _super.call(this, options);
        var collection = options.collection ? options.collection : new assets_collection_1.AssetsCollection(null, {
            url: options.url
        });
        this.collection = collection;
        this._listView = new assets_list_1.AssetsListView({
            collection: collection,
            deleteable: true
        });
        this._preView = new assets_preview_1.AssetsPreview();
        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove);
        this.collection = collection;
    }
    Object.defineProperty(GalleryView.prototype, "listView", {
        get: function () {
            return this._listView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryView.prototype, "preView", {
        get: function () {
            return this._preView;
        },
        enumerable: true,
        configurable: true
    });
    GalleryView.prototype.onRender = function () {
        this.regions['list'].show(this._listView);
        this.regions['preview'].show(this._preView);
        this._uploadButton = new filebutton_1.UploadButton({
            el: this.ui['button'],
            autoUpload: true,
            url: this.collection.url,
            maxSize: 1024 * 1000,
        });
        this.listenTo(this._uploadButton, 'upload', this._onItemCreate);
    };
    GalleryView.prototype._onItemCreate = function (asset) {
        this.collection.on('error', function (e) {
            console.log(e);
        });
        try {
            console.log('uploaded', asset);
            this.collection.add(asset);
        }
        catch (e) {
            console.log(e);
        }
    };
    GalleryView.prototype._onItemSelect = function (_a) {
        var model = _a.model;
        if (this._preView.model === model)
            return;
        this._preView.model = model;
        this.selected = model;
    };
    GalleryView.prototype._onItemRemove = function (_a) {
        var model = _a.model;
    };
    GalleryView.prototype._onSearch = function () {
        var search = this.ui['search'];
    };
    GalleryView = __decorate([
        template('gallery'),
        views_1.attributes({
            className: 'assets-gallery gallery',
            tagName: 'div',
            ui: {
                button: '.upload-button',
                search: ".assets-search-input" },
            events: {
                'change @ui.search': '_onSearch'
            }
        }), 
        __metadata('design:paramtypes', [Object])
    ], GalleryView);
    return GalleryView;
}(views_1.LayoutView));
exports.GalleryView = GalleryView;
