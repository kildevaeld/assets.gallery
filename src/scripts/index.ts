import 'whatwg-fetch';
import {EventEmitter} from 'eventsjs';
import * as views from 'views';
//import './preview-handlers';
export * from './fileuploader'
export * from './models/index'
export * from './ui/index';
export * from './client';

export class View<T extends HTMLElement> extends views.View<T> {
    
}

import {AssetsClient, AssetsClientOptions} from './client';

export function createClient(options:AssetsClientOptions) {
    return new AssetsClient(options);
}