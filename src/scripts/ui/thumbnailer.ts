//import {request} from '../request'
import {AssetsModel} from '../models'
import {IPromise, request} from 'utilities';

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
        return request.get(url).params({
            thumbnail: true,
            base64: false
        }).end().then(function() {

            return "";
        });
    }

    static has(asset: AssetsModel): IPromise<string> {
        return request.get(asset.getURL()).params({
            thumbnail: true,
            check: true
        }).end().then(function(msg) {
            return `${asset.getURL()}?thumbnail=true`;
        }).catch(function() {
            return null;
        });
    }
}