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
    
    getURL (): string {
        let baseURL = this.collection.getURL();
        return normalize_path(baseURL, encodeURIComponent(this.id));
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

	/*fetch (options:AssetsCollectionFetchOption = {}, progress?:() => void): IPromise<any> {

		return request.get(this.url)
		.progress(function (e) {
			progress ? progress() : void 0;
		})
		.json().then((result: Object) => {
			if (!Array.isArray(result)) {
				throw new Error('invalid format: expected json array');
			}

			this.reset(result);
			return this.models;

		});
	}*/

}
