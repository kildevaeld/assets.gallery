import {RestCollectionOptions, RestModel, RestCollection} from 'collection';
//import {request} from '../request';
import {normalizeURL} from '../utilities';
import {AssetsClient} from '../client';
import * as utils from 'utilities';

export class AssetsModel extends RestModel {
    idAttribute = "id";
    collection: AssetsCollection;

    get fullPath(): string {
        let path = this.get('path');
        if (path !== '/') {
            if (path[path.length - 1] !== '/') path += '/';
        }
        path = path + this.get('filename');
        return path;
    }

    getURL(): string {
        
        let baseURL = utils.result(this, 'rootURL');
        if (this.collection) {
            baseURL = this.collection.getURL();    
        }
        
        if (baseURL == null) throw new Error("no url");
        
        let path = this.get('path');
        path = normalizeURL(baseURL, path, encodeURIComponent(this.get('filename')));
        return path;
    }

}

export interface AssetsCollectionOptions {
    fetchOnUrl?: boolean
}

export class AssetsCollection extends RestCollection<AssetsModel> {
    Model = AssetsModel;
    comparator = 'name';

    constructor(client: AssetsClient, options?: AssetsCollectionOptions) {
        super(null, {
            url: client.url
        });

        options = options || { fetchOnUrl: true };

        this.listenTo(client, 'change:url', () => {
            this.url = client.url;
            if (options.fetchOnUrl)
                this.fetch();
            //this.reset([]);
            
        });
    }


}
