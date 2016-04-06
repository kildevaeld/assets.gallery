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
var utils_1 = require('../utils');
var utils = require('utilities');
var mime_types_1 = require('../mime-types');
var AssetsListItemView = (function (_super) {
    __extends(AssetsListItemView, _super);
    function AssetsListItemView() {
        _super.apply(this, arguments);
    }
    AssetsListItemView.prototype.onRender = function () {
        var model = this.model;
        var mime = model.get('mime');
        utils.removeClass(this.ui['mime'], 'mime-unknown');
        mime = mime_types_1.getMimeIcon(mime.replace(/\//, '-'));
        utils.addClass(this.ui['mime'], mime);
        this.ui['name'].textContent = utils.truncate(model.get('name') || model.get('filename'), 25);
        var url = model.getURL();
        var img = new Image();
        img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=";
        img.setAttribute('data-src', url + "?thumbnail=true");
        this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
        this.ui['mime'].style.display = 'none';
        this.trigger('image');
    };
    AssetsListItemView.prototype._onClick = function (e) {
        e.preventDefault();
        var target = e.target;
        if (target === this.ui['remove'])
            return;
        this.triggerMethod('click', this.model);
    };
    AssetsListItemView.prototype._onDblClick = function (e) {
        e.preventDefault();
        this.trigger('dblclick', this.model);
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
    return AssetsListItemView;
}(views_1.View));
exports.AssetsListItemView = AssetsListItemView;
