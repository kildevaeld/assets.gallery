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
const html = require('utilities/lib/html');
const utilities_1 = require('utilities');
const list_item_1 = require('./list-item');
const Blazy = require('blazy');
exports.AssetsEmptyView = views_1.View.extend({
    className: 'assets-list-empty-view',
    template: 'No files uploaded yet.'
});
let AssetsListView = class AssetsListView extends views_1.CollectionView {
    constructor(options) {
        super(options);
        this.options = options || {};
        this.sort = false;
        this._onSroll = throttle(utilities_1.bind(this._onSroll, this), 0);
        this._initEvents();
        this._initBlazy();
    }
    _initEvents() {
        this.listenTo(this, 'childview:click', function (view, model) {
            if (this._current)
                html.removeClass(this._current.el, 'active');
            this._current = view;
            html.addClass(view.el, 'active');
            this.trigger('selected', view, model);
        });
        this.listenTo(this, 'childview:dbclick', function (view, model) {
            if (this._current)
                html.removeClass(this._current.el, 'active');
            this._current = view;
            html.addClass(view.el, 'active');
            this.trigger('selected', view, model);
            this.trigger('dblclick', view, model);
        });
        this.listenTo(this, 'childview:remove', function (view, { model }) {
            if (this.options.deleteable === true) {
                let remove = true;
                if (model.has('deleteable')) {
                    remove = !!model.get('deleteable');
                }
                if (remove)
                    model.remove();
            }
            else {
            }
        });
        this.listenTo(this, 'childview:image', function (view) {
            let img = view.$('img')[0];
            if (img.src === img.getAttribute('data-src')) {
                return;
            }
            setTimeout(() => {
                if (elementInView(view.el, this.el)) {
                    this._blazy.load(view.$('img')[0]);
                }
            }, 100);
        });
        this.listenTo(this.collection, 'before:fetch', () => {
            let loader = this.el.querySelector('.loader');
            if (loader)
                return;
            loader = document.createElement('div');
            html.addClass(loader, 'loader');
            this.el.appendChild(loader);
        });
        this.listenTo(this.collection, 'fetch', () => {
            let loader = this.el.querySelector('.loader');
            if (loader) {
                this.el.removeChild(loader);
            }
        });
    }
    onRenderCollection() {
        if (this._blazy) {
            this._blazy.revalidate();
        }
        else {
            this._initBlazy();
        }
    }
    _onSroll(e) {
        let index = this.index ? this.index : (this.index = 0), len = this.children.length;
        for (let i = index; i < len; i++) {
            let view = this.children[i], img = view.$('img')[0];
            if (img == null)
                continue;
            if (img.src === img.getAttribute('data-src')) {
                index = i;
            }
            else if (elementInView(img, this.el)) {
                index = i;
                this._blazy.load(img, true);
            }
        }
        this.index = index;
        let el = this.el;
        if (el.scrollTop < (el.scrollHeight - el.clientHeight) - el.clientHeight) {
        }
        else if (this.collection.hasNext()) {
            this.collection.getNextPage();
        }
    }
    _initBlazy() {
        this._blazy = new Blazy({
            container: '.assets-list',
            selector: 'img',
            error: function (img) {
                if (!img || !img.parentNode)
                    return;
                let m = img.parentNode.querySelector('.mime');
                if (m) {
                    m.style.display = 'block';
                    img.style.display = 'none';
                }
            }
        });
    }
    _initHeight() {
        let parent = this.el.parentElement;
        if (!parent || parent.clientHeight === 0) {
            if (!this._timer) {
                this._timer = setInterval(() => this._initHeight(), 200);
            }
            return;
        }
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = void 0;
        }
        this.el.style.height = parent.clientHeight + 'px';
    }
    onShow() {
        this._initHeight();
    }
};
AssetsListView = __decorate([
    views_1.attributes({
        className: 'assets-list collection-mode',
        childView: list_item_1.AssetsListItemView,
        emptyView: exports.AssetsEmptyView,
        events: {
            scroll: '_onSroll'
        }
    }), 
    __metadata('design:paramtypes', [Object])
], AssetsListView);
exports.AssetsListView = AssetsListView;
function elementInView(ele, container) {
    var viewport = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    viewport.bottom = (container.innerHeight || document.documentElement.clientHeight);
    viewport.right = (container.innerWidth || document.documentElement.clientWidth);
    var rect = ele.getBoundingClientRect();
    return (rect.right >= viewport.left
        && rect.bottom >= viewport.top
        && rect.left <= viewport.right
        && rect.top <= viewport.bottom) && !ele.classList.contains('b-error');
}
function throttle(fn, minDelay) {
    var lastCall = 0;
    return function () {
        var now = +new Date();
        if (now - lastCall < minDelay) {
            return;
        }
        lastCall = now;
        fn.apply(this, arguments);
    };
}
