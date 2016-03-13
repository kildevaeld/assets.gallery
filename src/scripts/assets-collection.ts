import {RestCollectionOptions, RestModel, RestCollection, normalize_path} from 'collection';
import {request} from './request';
import {Promise, IPromise} from 'utilities';


export interface AssetsCollectionOptions extends RestCollectionOptions<AssetsModel> {
	url: string;
}

export interface AssetsCollectionFetchOption { }

/*export class AssetsModel extends Model {
	idAttribute = 'path';
	collection: AssetsCollection;
    getURL (): string {
        return this.collection.url + "/"  + encodeURIComponent(this.get('path'));
    }
}*/

export class AssetsModel extends RestModel {
	idAttribute = "path";
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
	url: string;


	constructor (models, options:AssetsCollectionOptions) {
		super(models, options);
		this.url = options.url;
	}


}
