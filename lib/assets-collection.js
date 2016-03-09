"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collection_1 = require('collection');
var request_1 = require('./request');
var AssetsModel = (function (_super) {
    __extends(AssetsModel, _super);
    function AssetsModel() {
        _super.apply(this, arguments);
        this.idAttribute = 'path';
    }
    AssetsModel.prototype.getURL = function () {
        return this.collection.url + "/" + encodeURIComponent(this.get('path'));
    };
    return AssetsModel;
}(collection_1.Model));
exports.AssetsModel = AssetsModel;
var AssetsCollection = (function (_super) {
    __extends(AssetsCollection, _super);
    function AssetsCollection(models, options) {
        _super.call(this, models, options);
        this.Model = AssetsModel;
        this.comparator = 'name';
        this.url = options.url;
    }
    AssetsCollection.prototype.fetch = function (options, progress) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return request_1.request.get(this.url)
            .progress(function (e) {
            progress ? progress() : void 0;
        })
            .json().then(function (result) {
            if (!Array.isArray(result)) {
                throw new Error('invalid format: expected json array');
            }
            _this.reset(result);
            return _this.models;
        });
    };
    return AssetsCollection;
}(collection_1.Collection));
exports.AssetsCollection = AssetsCollection;
