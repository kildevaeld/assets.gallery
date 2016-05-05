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
var Cropper = require('cropperjs');
var CropView = (function (_super) {
    __extends(CropView, _super);
    function CropView(options) {
        if (options === void 0) { options = { resize: false }; }
        _super.call(this, options);
        this.options = options;
    }
    Object.defineProperty(CropView.prototype, "cropper", {
        get: function () {
            if (this._cropper != null)
                return this._cropper;
            if (this.ui['image'] == null)
                return null;
            return this.activate()._cropper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CropView.prototype, "cropping", {
        get: function () {
            return this._cropping;
        },
        set: function (cropping) {
            this._cropping = cropping;
        },
        enumerable: true,
        configurable: true
    });
    CropView.prototype.activate = function () {
        var _this = this;
        if (this._cropper != null) {
            return this;
        }
        this._cropper = new Cropper(this.ui['image'], {
            aspectRatio: this.options.aspectRatio,
            crop: function (e) {
                _this._cropping = e.detail;
                _this.trigger('crop', e.detail);
            },
            data: this.cropping,
            built: function (e) { return _this.trigger('built', e); }
        });
        return this;
    };
    CropView.prototype.deactivate = function () {
        if (this.cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    };
    CropView.prototype.render = function () {
        _super.prototype.render.call(this);
        if (this.ui['image'] == null) {
            this.undelegateEvents();
            var image = document.createElement('img');
            this.el.appendChild(image);
            this.ui['image'] = image;
            this.delegateEvents();
        }
        return this;
    };
    CropView = __decorate([
        views_1.attributes({
            className: 'assets cropping-view',
            ui: {
                image: 'img'
            }
        }), 
        __metadata('design:paramtypes', [Object])
    ], CropView);
    return CropView;
}(views_1.View));
exports.CropView = CropView;
