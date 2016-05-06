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
const Cropper = require('cropperjs');
const utils_1 = require('../utils');
let CropView = class CropView extends views_1.View {
    constructor(options = { resize: false }) {
        super(options);
        this.options = options;
    }
    get cropper() {
        if (this._cropper != null)
            return this._cropper;
        if (this.ui['image'] == null)
            return null;
        return this.activate()._cropper;
    }
    get cropping() {
        return this._cropping;
    }
    set cropping(cropping) {
        this._cropping = cropping;
        if (this.options.preview)
            this.options.preview.cropping = cropping;
    }
    setModel(model) {
        if (this.ui['image'] == null)
            return this;
        let image = this.ui['image'];
        if (model == null) {
            image.src = "";
            if (this.model)
                this.stopListening(this.model);
            this._model = model;
            return;
        }
        image.src = model.getURL();
        super.setModel(model);
        if (this.options.aspectRatio != null) {
            utils_1.getImageSize(image).then(size => {
                this._cropping = utils_1.getCropping(size, this.options.aspectRatio);
            }).catch(e => {
                this.trigger('error', e);
            });
        }
        return this;
    }
    activate() {
        if (this._cropper != null) {
            return this;
        }
        this._cropper = new Cropper(this.ui['image'], {
            aspectRatio: this.options.aspectRatio,
            crop: (e) => {
                this._cropping = e.detail;
                this.triggerMethod('crop', e.detail);
            },
            data: this.cropping,
            built: (e) => this.triggerMethod('built', e),
            viewMode: 1
        });
        return this;
    }
    deactivate() {
        if (this.cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }
    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }
    onCrop(cropping) {
        if (this.options.preview) {
            this.options.preview.cropping = cropping;
        }
    }
    render() {
        this.triggerMethod('before:render');
        this.undelegateEvents();
        let image = this.el.querySelector('img');
        if (image == null) {
            image = document.createElement('img');
            this.el.appendChild(image);
        }
        this.delegateEvents();
        this.triggerMethod('render');
        return this;
    }
    destroy() {
        this.deactivate();
        super.destroy();
    }
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
exports.CropView = CropView;
