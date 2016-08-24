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
const utils_1 = require('../utils');
const utils = require('orange/browser');
const mime_types_1 = require('../mime-types');
let AssetsListItemView = class AssetsListItemView extends views_1.View {
    onRender() {
        let model = this.model;
        let mime = model.get('mime');
        utils.removeClass(this.ui['mime'], 'mime-unknown');
        mime = mime_types_1.getMimeIcon(mime.replace(/\//, '-'));
        utils.addClass(this.ui['mime'], mime);
        this.ui['name'].textContent = utils.truncate(model.get('name') || model.get('filename'), 25);
        let url = model.getURL();
        let img = new Image();
        img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=";
        img.setAttribute('data-src', `${url}?thumbnail=true`);
        this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
        this.ui['mime'].style.display = 'none';
        this.trigger('image');
    }
    _onClick(e) {
        e.preventDefault();
        let target = e.target;
        if (target === this.ui['remove'])
            return;
        this.triggerMethod('click', this.model);
    }
    _onDblClick(e) {
        this.triggerMethod('dblclick', this.model);
    }
};
AssetsListItemView = __decorate([
    utils_1.template('list-item'),
    views_1.attributes({
        tagName: 'div',
        className: 'assets-list-item',
        ui: {
            remove: '.assets-list-item-close-button',
            name: '.name',
            mime: '.mime'
        },
        triggers: {
            'click @ui.remove': 'remove'
        },
        events: {
            'click': '_onClick',
            'dblclick': '_onDblClick'
        }
    }), 
    __metadata('design:paramtypes', [])
], AssetsListItemView);
exports.AssetsListItemView = AssetsListItemView;
