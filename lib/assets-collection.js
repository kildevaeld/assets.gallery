"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('collection');
var AssetsModel = (function (_super) {
    __extends(AssetsModel, _super);
    function AssetsModel() {
        _super.apply(this, arguments);
        this.idAttribute = "path";
    }
    Object.defineProperty(AssetsModel.prototype, "fullPath", {
        get: function () {
            var path = this.get('path');
            path = (path === '/' ? path : path + "/") + this.get('filename');
            return path;
        },
        enumerable: true,
        configurable: true
    });
    AssetsModel.prototype.getURL = function () {
        var baseURL = this.collection.getURL();
        var path = this.get('path');
        path = (path === '/' ? path : path + "/") + this.get('filename');
        return collection_1.normalize_path(baseURL, encodeURIComponent(path));
    };
    return AssetsModel;
}(collection_1.RestModel));
exports.AssetsModel = AssetsModel;
var AssetsCollection = (function (_super) {
    __extends(AssetsCollection, _super);
    function AssetsCollection(models, options) {
        _super.call(this, models, options);
        this.Model = AssetsModel;
        this.comparator = 'name';
        this.url = options.url;
    }
    return AssetsCollection;
}(collection_1.RestCollection));
exports.AssetsCollection = AssetsCollection;
