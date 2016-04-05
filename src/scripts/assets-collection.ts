import {RestCollectionOptions, RestModel, RestCollection, normalize_path} from 'collection';
import {request} from './request';
import {normalizeURL} from './utilities';

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
}
