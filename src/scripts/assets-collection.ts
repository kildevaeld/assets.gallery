import {RestCollectionOptions, RestModel, RestCollection, normalize_path} from 'collection';
import {request} from './request';


export class AssetsModel extends RestModel {
	idAttribute = "id";
	collection: AssetsCollection;
    
    get fullPath (): string {
        let path = this.get('path');
        path = (path === '/' ? path : path + "/") + this.get('filename');
        return path;    
    }
    
    getURL (): string {
        let baseURL = this.collection.getURL();
        let path = this.get('path');
        path = (path === '/' ? path : path + "/") + this.get('filename');  
        return normalize_path(baseURL, encodeURIComponent(path));
    }

}

export class AssetsCollection extends RestCollection<AssetsModel> {
	Model = AssetsModel;
	comparator = 'name';
}
