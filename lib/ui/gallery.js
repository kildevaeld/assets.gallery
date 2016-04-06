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
var list_1 = require('./list');
var assets_preview_1 = require('./assets-preview');
var filebutton_1 = require('./filebutton');
var utils = require('utilities');
var client_1 = require('../client');
var utils_1 = require('./utils');
var GalleryView = (function (_super) {
    __extends(GalleryView, _super);
    function GalleryView(client, options) {
        if (options === void 0) { options = {}; }
        options.regions = {
            list: '.gallery-list',
            preview: '.gallery-preview'
        };
        _super.call(this, options);
        this._options = options;
        this._client = client;
        this.collection = client.getCollection();
        this._listView = new list_1.AssetsListView({
            collection: this.collection,
            deleteable: true
        });
        this._preView = new assets_preview_1.AssetsPreview();
        this.listenTo(this._listView, 'selected', this._onItemSelect);
        this.listenTo(this._listView, 'remove', this._onItemRemove);
    }
    Object.defineProperty(GalleryView.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(GalleryView.prototype, "url", {
        get: function () {
            return this.collection.getURL();
        },
        set: function (url) {
            this.collection.url = url;
            this._uploadButton.url = url;
        },
        enumerable: true,
        configurable: true
    });
    GalleryView.prototype.onRender = function () {
        var _this = this;
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
            this.listenTo(this._client, 'change:url', function () {
                _this._uploadButton.url = _this._client.url;
            });
        }
        this.listenTo(this._uploadButton, 'upload', this._onItemCreate);
        this.listenTo(this._uploadButton, 'progress', this._onUploadProgress);
        this._uploadButton.render();
    };
    GalleryView.prototype._onUploadProgress = function (e) {
        var p = Math.round((e.progress / e.total) * 100);
        this.$('.upload-progress')[0].style.width = p + '%';
    };
    GalleryView.prototype._onItemCreate = function (asset) {
        var _this = this;
        setTimeout(function () {
            var elm = _this.$('.upload-progress')[0];
            utils.transitionEnd(elm, function (e) {
                elm.style.width = '0';
                utils.transitionEnd(elm, function (e) {
                    elm.style.opacity = '1';
                }, 1000);
            }, 600);
            elm.style.opacity = '0';
        }, 800);
        this.collection.on('error', function (e) {
            console.log(e);
        });
        try {
            this.collection.add(asset, { silent: false, parse: true });
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
        if (this._preView.model === model) {
            this._preView.model = null;
        }
    };
    GalleryView.prototype._onSearch = function () {
        var search = this.ui['search'];
        this.collection.query(search.value).catch(function (e) {
            console.log(e);
        });
    };
    GalleryView = __decorate([
        utils_1.template('gallery'),
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
        __metadata('design:paramtypes', [client_1.AssetsClient, Object])
    ], GalleryView);
    return GalleryView;
}(views_1.LayoutView));
exports.GalleryView = GalleryView;
