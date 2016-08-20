import { ViewOptions, IDataView } from 'views';
export declare type PreviewHandlerConstructor = new (options: ViewOptions) => IDataView;
export declare function getPreviewHandler(mime: string): PreviewHandlerConstructor;
export declare function preview(...mimetypes: string[]): ClassDecorator;
