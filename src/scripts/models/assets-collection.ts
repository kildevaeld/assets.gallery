import {RestCollectionOptions, RestModel, RestCollection, PaginatedCollection} from 'collection';
//import {request} from '../request';
import {normalizeURL} from '../utilities';
import {AssetsClient} from '../client';
import {result} from 'orange';

export interface IAsset {
    filename: string;
    path: string;
    mime: string;
    size: number;
    meta: {[key: string]: any};
    [key: string]: any;
}

export class AssetsModel extends RestModel {
    idAttribute = "id";
    collection: AssetsCollection;
    
    constructor(data:IAsset, options?:any) {
        super(data, options);
    }

    get fullPath(): string {
        let path = this.get('path');
        if (path !== '/') {
            if (path[path.length - 1] !== '/') path += '/';
        }
        path = path + this.get('filename');
        return path;
    }

    getURL(): string {
        
        let baseURL = result(this, 'rootURL');
        if (this.collection) {
            baseURL = this.collection.getURL();    
        }
        
        if (baseURL == null) throw new Error("no url");
        
        let path = this.get('path');
        path = normalizeURL(baseURL, path, encodeURIComponent(this.get('filename')));
        return path;
    }
    
    toJSON(): IAsset {
        return super.toJSON();
    }

}

export interface AssetsCollectionOptions {
    fetchOnUrl?: boolean
}

export class AssetsCollection extends PaginatedCollection<AssetsModel> {
    Model = AssetsModel;
    comparator = 'name';

    constructor(client: AssetsClient, options?: AssetsCollectionOptions) {
        super(null, {
            url: client.url
        });

        options = options || { fetchOnUrl: true };
        (<any>this)._state.size = 30;
        this.listenTo(client, 'change:url', () => {
            this.url = client.url;
            if (options.fetchOnUrl)
                this.fetch();
            //this.reset([]);
            
        });
    }


}
