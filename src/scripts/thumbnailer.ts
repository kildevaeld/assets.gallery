import {request} from './request'
import {AssetsModel} from './assets-collection'
import {IPromise} from 'utilities';

export const MimeList = {
    'audio/mpeg': 'audio-generic',
    'audio/ogg': 'audio-generic',
    'application/pdf': 'application-pdf',
    'video/ogg': 'video-generic',
    'video/mp4': 'video-generic',
    'video/x-m4v': 'video-generic',
    'video/quicktime': 'video-generic'
}

export class Thumbnailer {

    static request(asset: AssetsModel): IPromise<string> {
        let url = asset.getURL();
        return request.get(url).end({
            thumbnail: true,
            base64: false
        }).then(function() {

            return "";
        });
    }

    static has(asset: AssetsModel): IPromise<string> {
        return request.get(asset.getURL()).end({
            thumbnail: true,
            check: true
        }).then(function(msg) {
            return `${asset.getURL()}?thumbnail=true`;
        }).catch(function() {
            return null;
        });
    }
}
