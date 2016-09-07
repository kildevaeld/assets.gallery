"use strict";
const collection_1 = require('collection');
const utilities_1 = require('../utilities');
const orange_1 = require('orange');
class AssetsModel extends collection_1.RestModel {
    constructor(data, options) {
        super(data, options);
        this.idAttribute = "id";
    }
    get fullPath() {
        let path = this.get('path');
        if (path !== '/') {
            if (path[path.length - 1] !== '/')
                path += '/';
        }
        path = path + this.get('filename');
        return path;
    }
    getURL() {
        let baseURL = orange_1.result(this, 'rootURL');
        if (this.collection) {
            baseURL = this.collection.getURL();
        }
        if (baseURL == null)
            throw new Error("no url");
        let path = this.get('path');
        path = utilities_1.normalizeURL(baseURL, path, encodeURIComponent(this.get('filename')));
        return path;
    }
    toJSON() {
        return super.toJSON();
    }
}
exports.AssetsModel = AssetsModel;
class AssetsCollection extends collection_1.PaginatedCollection {
    constructor(client, options) {
        super(null, {
            url: client.url
        });
        this.Model = AssetsModel;
        this.comparator = 'name';
        options = options || { fetchOnUrl: true };
        this._state.size = 30;
        this.listenTo(client, 'change:url', () => {
            this.url = client.url;
            if (options.fetchOnUrl)
                this.fetch();
        });
    }
}
exports.AssetsCollection = AssetsCollection;
