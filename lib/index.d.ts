import 'whatwg-fetch';
import * as views from 'views';
export * from './fileuploader';
export * from './models/index';
export * from './ui/index';
export * from './client';
export declare class View<T extends HTMLElement> extends views.View<T> {
}
import { AssetsClient, AssetsClientOptions } from './client';
export declare function createClient(options: AssetsClientOptions): AssetsClient;
