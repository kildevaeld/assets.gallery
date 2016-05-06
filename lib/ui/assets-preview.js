"use strict";
const views_1 = require('views');
const utilities_1 = require('../utilities');
const html = require('utilities/lib/html');
const thumbnailer_1 = require('./thumbnailer');
const templates_1 = require('./templates');
exports.AssetsInfoPreview = views_1.View.extend({
    ui: {
        name: '.name',
        mime: '.mimetype',
        size: '.size',
        download: '.download'
    },
    events: {
        "click a.remove": "onItemRemove"
    },
    tagName: 'table',
    className: 'info',
    template: templates_1.default['preview-info'],
    setModel(model) {
        if (model == null)
            return;
        this.ui.name.textContent = model.get('filename');
        this.ui.mime.textContent = model.get('mime');
        this.ui.size.textContent = utilities_1.humanFileSize(model.get('size'), true);
        let link = this.ui.download.querySelector('a');
        let url = model.getURL();
        views_1.View.prototype.setModel.call(this, model);
        link.textContent = model.get('name');
        link.href = url + '?download=true';
    },
    clear() {
        if (this.ui.name) {
            this.ui.name.textContent = "";
        }
        if (this.ui.mime) {
            this.ui.mime.textContent = "";
        }
        if (this.ui.size) {
            this.ui.size.textContent = "";
        }
        if (this.ui.download) {
            let fp = this.model.fullPath;
            let link = this.ui.download.querySelector('a');
            link.textContent = fp;
            link.href = fp + '?download=true';
        }
    },
    onItemRemove() {
        this.model.remove().then(() => {
            let link = this.ui.download.querySelector('a');
        });
    }
});
let previewHandlers = {};
function setPreviewHandler(mime, view) {
    if (!Array.isArray(mime)) {
        mime = [mime];
    }
    mime.forEach(function (m) {
        previewHandlers[m] = view;
    });
}
exports.setPreviewHandler = setPreviewHandler;
function getPreviewHandler(mime) {
    let reg, k;
    for (k in previewHandlers) {
        if ((new RegExp(k)).test(mime))
            return previewHandlers[k];
    }
    return null;
}
exports.getPreviewHandler = getPreviewHandler;
class AssetsPreview extends views_1.LayoutView {
    constructor(options = {}) {
        let opts = options.infoViewOptions || {};
        super({
            regions: {
                preview: '.preview-region',
                info: '.info-region'
            },
            className: 'assets-preview',
            template: templates_1.default['preview']
        });
        this.infoView = options.infoView ? new options.infoView(opts) : new exports.AssetsInfoPreview(opts);
    }
    setModel(model) {
        super.setModel(model);
        this.hideInfoView(model == null ? true : false);
        this.infoView.model = model;
        if (model == null) {
            this.infoView.clear();
            return;
        }
        let Handler = getPreviewHandler(model.get('mime'));
        let region = this.regions['preview'];
        region.empty();
        this.listenTo(model, 'remove', () => {
            region.empty();
            this.infoView.clear();
        });
        if (Handler) {
            let view = new Handler({ model: model });
            html.addClass(view.el, 'preview');
            region.show(view);
        }
        else {
            let image = new Image();
            let div = document.createElement('div');
            html.addClass(div, 'preview');
            region.el.innerHTML = '';
            region.el.appendChild(div);
            thumbnailer_1.Thumbnailer.has(model)
                .then((test) => {
                if (!test)
                    return;
                image.src = test;
                div.appendChild(image);
            }).catch((e) => {
                console.log(e);
            });
        }
        return this;
    }
    onRender() {
        this.regions['info'].show(this.infoView);
        this.hideInfoView();
    }
    hideInfoView(hide = true) {
        this.infoView.el.style.display = hide ? 'none' : 'table';
    }
}
exports.AssetsPreview = AssetsPreview;
