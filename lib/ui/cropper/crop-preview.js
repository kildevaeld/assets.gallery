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
var CropPreView = (function (_super) {
    __extends(CropPreView, _super);
    function CropPreView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CropPreView.prototype, "cropping", {
        get: function () {
            return this._cropping;
        },
        set: function (cropping) {
            this._cropping = cropping;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    CropPreView.prototype.render = function () {
        _super.prototype.render.call(this);
        if (this.ui['image'] == null) {
            this.undelegateEvents();
            var image_1 = document.createElement('img');
            this.el.appendChild(image_1);
            this.ui['image'] = image_1;
            this.delegateEvents();
        }
        var image = this.ui['image'];
        if (image.src !== '') {
            this.size = {
                width: image.naturalWidth,
                height: image.naturalHeight
            };
        }
        image.style.maxHeight = '';
        image.style.maxWidth = '';
        return this;
    };
    CropPreView.prototype.update = function () {
        if (this._cropping == null || this.ui['image'] == null)
            return this;
        var img = this.ui['image'];
        var el = this.el;
        var cropping = this._cropping;
        var cw = el.clientWidth, ch = el.clientHeight, rx = cw / cropping.width, ry = ch / cropping.height;
        var width = 0, height = 0;
        if (this.size) {
            width = this.size.width;
            height = this.size.height;
        }
        var e = {
            width: Math.round(rx * width) + 'px',
            height: Math.round(ry * height) + 'px',
            marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
            marginTop: '-' + Math.round(ry * cropping.y) + 'px'
        };
        for (var key in e) {
            img.style[key] = e[key];
        }
        this.trigger('update');
    };
    CropPreView.prototype._onImageLoad = function () {
        var el = this.ui['image'];
        this.size = {
            width: el.naturalWidth || el.width,
            height: el.naturalHeight || el.height
        };
        this.trigger('onload', this.size);
    };
    CropPreView = __decorate([
        views_1.attributes({
            className: 'assets cropping-preview',
            ui: {
                image: 'img'
            },
            events: {
                'onload @ui.image': '_onImageLoad'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], CropPreView);
    return CropPreView;
}(views_1.View));
exports.CropPreView = CropPreView;
