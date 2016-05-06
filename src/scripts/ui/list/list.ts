declare var require: any;

import {CollectionView, CollectionViewOptions, View, attributes} from 'views';
import * as html from 'utilities/lib/html';
import {bind} from 'utilities';
import {AssetsListItemView} from './list-item';

const Blazy = require('blazy');

export interface AssetsListOptions extends CollectionViewOptions {
    deleteable?: boolean;
}


export const AssetsEmptyView = View.extend({
    className: 'assets-list-empty-view',
    template: 'No files uploaded yet.'
})


@attributes({
    className: 'assets-list collection-mode',
    childView: AssetsListItemView,
    emptyView: AssetsEmptyView,
    events: {
        'scroll': '_onSroll'
    }
})
export class AssetsListView extends CollectionView<HTMLDivElement> {
    _current: View<HTMLDivElement>;
    private _blazy: any;
    private index: number;
    constructor(options?: AssetsListOptions) {
        super(options);

        this.sort = false;

        this._onSroll = throttle(bind(this._onSroll, this), 500);

        this.listenTo(this, 'childview:click', function (view, model) {
            if (this._current) html.removeClass(this._current.el, 'active');
            this._current = view

            html.addClass(view.el, 'active')
            this.trigger('selected', view, model);
        });

        this.listenTo(this, 'childview:dbclick', function (view, model) {
            if (this._current) html.removeClass(this._current.el, 'active');
            this._current = view

            html.addClass(view.el, 'active')
            this.trigger('selected', view, model);
            this.trigger('dblclick', view, model);
        })

        this.listenTo(this, 'childview:remove', function (view, {model}) {
            console.log(arguments)
            if (options.deleteable === true) {
                let remove = true;
                if (model.has('deleteable')) {
                    remove = !!model.get('deleteable');
                }
                if (remove) model.remove();
            } else {

            }
        });

        this.listenTo(this, 'childview:image', function (view) {
            let img = view.$('img')[0]
            if (img.src === img.getAttribute('data-src')) {
                return;
            }
            this._blazy.load(view.$('img')[0], elementInView(view.el, this.el));
        });

        this.listenTo(this.collection, 'before:fetch', () => {
            let loader = <HTMLElement>this.el.querySelector('.loader');
            if (loader) return;
            loader = document.createElement('div');
            html.addClass(loader, 'loader');
            this.el.appendChild(loader)
        });

        this.listenTo(this.collection, 'fetch', () => {
            let loader = this.el.querySelector('.loader');
            if (loader) {
                this.el.removeChild(loader);
            }
        })

        this._initBlazy();

    }



    onRenderCollection() {
        if (this._blazy) {
            this._blazy.revalidate();
        } else {
            this._initBlazy();
        }

    }

    private _onSroll(e) {
        let index = this.index ? this.index : (this.index = 0),
            len = this.children.length

        for (let i = index; i < len; i++) {
            let view: View<HTMLDivElement> = <any>this.children[i],
                img = view.$('img')[0]
            if (img == null) continue
            if (img.src === img.getAttribute('data-src')) {
                index = i;
            } else if (elementInView(img, this.el)) {
                index = i
                this._blazy.load(img, true);
            }
        }
        this.index = index;
    }

    private _initBlazy() {
        this._blazy = new Blazy({
            container: '.assets-list',
            selector: 'img',
            error: function (img) {
                if (!img || !img.parentNode) return;
                let m = img.parentNode.querySelector('.mime');
                if (m) {
                    m.style.display = 'block';
                    img.style.display = 'none';
                }
            }
        });
    }

}

function elementInView(ele, container) {

    var viewport = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    };
    viewport.bottom = (container.innerHeight || document.documentElement.clientHeight)// + options.offset;
    viewport.right = (container.innerWidth || document.documentElement.clientWidth)// + options.offset;
    var rect = ele.getBoundingClientRect();

    return (
        // Intersection
        rect.right >= viewport.left
        && rect.bottom >= viewport.top
        && rect.left <= viewport.right
        && rect.top <= viewport.bottom
    ) && !ele.classList.contains('b-error');
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