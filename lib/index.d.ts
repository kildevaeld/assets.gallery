import * as views from 'views';
export * from './fileuploader';
export * from './models';
export * from './ui';
export * from './client';
export declare class View<T extends HTMLElement> extends views.View<T> {
}
import { AssetsClient, AssetsClientOptions } from './client';
export declare function createClient(options: AssetsClientOptions): AssetsClient;
