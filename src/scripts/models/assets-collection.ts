import {RestCollectionOptions, RestModel, RestCollection} from 'collection';
//import {request} from '../request';
import {normalizeURL} from '../utilities';
import {AssetsClient} from '../client';

export class AssetsModel extends RestModel {
	idAttribute = "id";
	collection: AssetsCollection;
    
    get fullPath (): string {
        let path = this.get('path');
        if (path !== '/') {
            if (path[path.length - 1] !== '/') path += '/';
        }
        path = path + this.get('filename');
        return path;    
    }
    
    getURL (): string {
        let baseURL = this.collection.getURL();
        let path = this.get('path'); 
        path = normalizeURL(baseURL, path, encodeURIComponent(this.get('filename')));
        return path;
    }

}

export class AssetsCollection extends RestCollection<AssetsModel> {
	Model = AssetsModel;
	comparator = 'name';
    
    constructor(client: AssetsClient) {
        super(null, {
            url: client.url
        });
        
        this.listenTo(client, 'change:url', () => {
            this.url = client.url;
            this.reset(null);
        });
    }
    
    
}
