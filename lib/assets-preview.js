"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var views_1 = require('views');
var utilities_1 = require('./utilities');
var html = require('utilities/lib/html');
var templates_1 = require('./templates');
var thumbnailer_1 = require('./thumbnailer');
exports.AssetsInfoPreview = views_1.View.extend({
    ui: {
        name: '.name',
        mime: '.mime',
        size: '.size',
        download: '.download'
    },
    events: {
        "click a.remove": "onItemRemove"
    },
    tagName: 'table',
    className: 'info',
    template: templates_1.PreviewInfoTemplate,
    setModel: function (model) {
        if (model == null)
            return;
        this.ui.name.textContent = model.get('name');
        this.ui.mime.textContent = model.get('mime');
        this.ui.size.textContent = utilities_1.humanFileSize(model.get('size'), true);
        var link = this.ui.download.querySelector('a');
        views_1.View.prototype.setModel.call(this, model);
        link.textContent = model.get('url');
        link.href = model.get('url') + '?download=true';
    },
    clear: function () {
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
            var link = this.ui.download.querySelector('a');
            link.textContent = this.model.get('url');
            link.href = this.model.get('url') + '?download=true';
        }
    },
    onItemRemove: function () {
        var _this = this;
        this.model.remove().then(function () {
            var link = _this.ui.download.querySelector('a');
        });
    }
});
var previewHandlers = {};
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
    var reg, k;
    for (k in previewHandlers) {
        if ((new RegExp(k)).test(mime))
            return previewHandlers[k];
    }
    return null;
}
exports.getPreviewHandler = getPreviewHandler;
var AssetsPreview = (function (_super) {
    __extends(AssetsPreview, _super);
    function AssetsPreview(options) {
        if (options === void 0) { options = {}; }
        var opts = options.infoViewOptions || {};
        _super.call(this, {
            regions: {
                preview: '.preview-region',
                info: '.info-region'
            },
            className: 'assets-preview',
            template: templates_1.PreviewTemplate
        });
        this.infoView = options.infoView ? new options.infoView(opts) : new exports.AssetsInfoPreview(opts);
    }
    AssetsPreview.prototype.setModel = function (model) {
        _super.prototype.setModel.call(this, model);
        this.hideInfoView(model == null ? true : false);
        this.infoView.model = model;
        var Handler = getPreviewHandler(model.get('mime'));
        var region = this.regions['preview'];
        region.empty();
        if (Handler) {
            var view = new Handler({ model: model });
            html.addClass(view.el, 'preview');
            region.show(view);
        }
        else {
            var image_1 = new Image();
            var div_1 = document.createElement('div');
            html.addClass(div_1, 'preview');
            region.el.innerHTML = '';
            region.el.appendChild(div_1);
            thumbnailer_1.Thumbnailer.has(model)
                .then(function (test) {
                image_1.src = test;
                div_1.appendChild(image_1);
            }).catch(function (e) {
                console.log(e);
            });
        }
        return this;
    };
    AssetsPreview.prototype.onRender = function () {
        this.regions['info'].show(this.infoView);
        this.hideInfoView();
    };
    AssetsPreview.prototype.hideInfoView = function (hide) {
        if (hide === void 0) { hide = true; }
        this.infoView.el.style.display = hide ? 'none' : 'table';
    };
    return AssetsPreview;
}(views_1.LayoutView));
exports.AssetsPreview = AssetsPreview;
