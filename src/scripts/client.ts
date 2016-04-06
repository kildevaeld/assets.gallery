
import {EventEmitter} from 'eventsjs';
import {extend, request, IPromise, Promise} from 'utilities';
import {AssetsCollection, AssetsModel} from './models'
import {normalizeURL} from './utilities';
import {HttpError} from './interface';
export interface AssetsClientOptions {
    url?: string;
}

export class AssetsClient extends EventEmitter {
    private __options: AssetsClientOptions;
    
    get options() {
        return extend({}, this.__options);
    }
    
    get url(): string {
        return this.__options.url;
    }
    
    set url(url:string) {
        if (this.url === url) return;
        this.__options.url = url;
        this.trigger('change:url', url);
    }

    constructor(options: AssetsClientOptions = {}) {
        super();

        this.__options = extend({}, options);

        if (!options.url || options.url === '') {
            this.__options.url = '/';
        }
                
    }
    
    getCollection(): AssetsCollection {
        return new AssetsCollection(this);
    }
    
    getById(id:any): IPromise<AssetsModel> {
        return request.get(this.url)
        .params({
            id: id
        }).json().then( value => {
           return new AssetsModel(value); 
        });
    }
    
    getByPath(path:string): IPromise<AssetsModel> {
        if (path == null || path === '' || path === '/') {
            return Promise.reject(new HttpError(500, ""));
        }
        let url = normalizeURL(this.url, path);
        
        return request.get(url)
        .json().then( value => {
            return new AssetsModel(value);   
        });
    }
    
}