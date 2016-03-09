import {Collection, CollectionOptions, Model} from 'collection';
import {request} from './request';
import {Promise, IPromise} from 'utilities';

export interface AssetsCollectionOptions extends CollectionOptions<AssetsModel> {
	url: string;
}

export interface AssetsCollectionFetchOption { }

export class AssetsModel extends Model {
	idAttribute = 'path';
	collection: AssetsCollection;
    getURL (): string {
        return this.collection.url + "/"  + encodeURIComponent(this.get('path'));
    }
}

export class AssetsCollection extends Collection<AssetsModel> {
	Model = AssetsModel;
	comparator = 'name';
	url: string;


	constructor (models, options:AssetsCollectionOptions) {
		super(models, options);
		this.url = options.url;
	}

	fetch (options:AssetsCollectionFetchOption = {}, progress?:() => void): IPromise<any> {

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
	}

}
