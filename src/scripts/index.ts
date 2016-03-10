import {EventEmitter} from 'eventsjs';
import * as views from 'views';
//import './preview-handlers';
import './preview-handlers/index';
export * from './fileuploader'
export * from './filebutton'
export * from './assets-collection'
export * from './assets-list'
export * from './assets-preview'
export * from './gallery'

export class View<T extends HTMLElement> extends views.View<T> {
    
}