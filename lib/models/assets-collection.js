"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('collection');
var utilities_1 = require('../utilities');
var utils = require('utilities');
var AssetsModel = (function (_super) {
    __extends(AssetsModel, _super);
    function AssetsModel(data, options) {
        _super.call(this, data, options);
        this.idAttribute = "id";
    }
    Object.defineProperty(AssetsModel.prototype, "fullPath", {
        get: function () {
            var path = this.get('path');
            if (path !== '/') {
                if (path[path.length - 1] !== '/')
                    path += '/';
            }
            path = path + this.get('filename');
            return path;
        },
        enumerable: true,
        configurable: true
    });
    AssetsModel.prototype.getURL = function () {
        var baseURL = utils.result(this, 'rootURL');
        if (this.collection) {
            baseURL = this.collection.getURL();
        }
        if (baseURL == null)
            throw new Error("no url");
        var path = this.get('path');
        path = utilities_1.normalizeURL(baseURL, path, encodeURIComponent(this.get('filename')));
        return path;
    };
    AssetsModel.prototype.toJSON = function () {
        return _super.prototype.toJSON.call(this);
    };
    return AssetsModel;
}(collection_1.RestModel));
exports.AssetsModel = AssetsModel;
var AssetsCollection = (function (_super) {
    __extends(AssetsCollection, _super);
    function AssetsCollection(client, options) {
        var _this = this;
        _super.call(this, null, {
            url: client.url
        });
        this.Model = AssetsModel;
        this.comparator = 'name';
        options = options || { fetchOnUrl: true };
        this.listenTo(client, 'change:url', function () {
            _this.url = client.url;
            if (options.fetchOnUrl)
                _this.fetch();
        });
    }
    return AssetsCollection;
}(collection_1.PaginatedCollection));
exports.AssetsCollection = AssetsCollection;
