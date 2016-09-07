
import {EventEmitter} from 'eventsjs';
import {extend, IPromise, Promise} from 'orange';
import * as request from 'orange.request';
import {AssetsCollection, AssetsModel, IAsset} from './models/index'
import {normalizeURL} from './utilities';
import {HttpError} from './interface';

export interface AssetsClientOptions {
    url?: string;
}

export class AssetsClient extends EventEmitter {
    
    toModel (attr:any): AssetsModel {
        return new AssetsModel(attr, {
            url: this.url
        });
    }
    
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
        }).json<IAsset>(null, true).then( value => {
           return new AssetsModel(value, {
               url: this.url
           }); 
        });
    }
    
    getByPath(path:string): IPromise<AssetsModel> {
        if (path == null || path === '' || path === '/') {
            return Promise.reject(new HttpError(500, ""));
        }
        let url = normalizeURL(this.url, path);
        
        return request.get(url)
        .json<IAsset>(null, true).then( value => {
            return new AssetsModel(value, {
                url: this.url
            });   
        });
    }
    
}