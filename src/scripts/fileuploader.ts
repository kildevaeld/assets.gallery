
import {EventEmitter} from 'eventsjs';
import {HttpMethod} from 'orange.request';
import * as request from 'orange.request';
import {extend, Promise, IPromise} from 'orange';
import {HttpError} from './interface';
export interface FileUploaderOptions {
    url: string
    method?: HttpMethod
    maxSize?: number
    mimeType?: string[]|string
    parameter?: string
}

export type FileUploadResult = any

export interface FileUploadProgress {
  (progress: number, total: number)
}



export class FileUploader extends EventEmitter {
    options: FileUploaderOptions
    constructor(options: FileUploaderOptions) {
        super()
        this.options = extend({}, {
          parameter: 'file',
          method: HttpMethod.POST,
          maxSize: 2048
        }, options)
    }

    upload(file: File, progressFn?:FileUploadProgress, attributes?:Object): IPromise<Object> {

        try {
          this.validateFile(file);
        } catch (e) {
          return Promise.reject(e)
          //return Promise.reject<FileUploadResult>(e)
        }

        let formData = new FormData()

        formData.append(this.options.parameter, file)

        attributes = attributes || {};

        Object.keys(attributes).forEach(function (key) {
          var value = attributes[key];
          formData.append(key, value);
        });

        
        return request.post(this.options.url)
        .header({
            'Content-Type': file.type, 
        })
        .params({filename: file.name})
        .uploadProgress( (event) => {
           
          if (event.lengthComputable) {
             let progress = (event.loaded / event.total * 100 || 0);
             this.trigger('progress', file, progress);

             if (progressFn != null) {
               progressFn(event.loaded, event.total)
             }
            }
        })
        .end<string>(file)
        .then( (res) => {
            if (!res.ok) {
                throw new HttpError(res.status, res.statusText);
            }
            return res.json();
        })


    }

    validateFile (file: File) {

      let maxSize = this.options.maxSize * 1000

      if (maxSize !== 0 && file.size > maxSize) {
        throw new Error('file to big');
      }

      var type = file.type;

      var mimeTypes: any

      if (typeof this.options.mimeType === 'string') {
        mimeTypes = [this.options.mimeType];
      } else {
        mimeTypes = this.options.mimeType;
      }

      if (!mimeTypes) return;


      for (var i = 0; i < mimeTypes.length; i++ ) {
        let mime = new RegExp(mimeTypes[i].replace('*','.*'));
        if (mime.test(type))
          return
        else
          throw new Error('Wrong mime type');
      }

    }
}

function formatResponse (response): any {
  var ret = null;
  try {
    ret = JSON.parse(response);
  } catch (e) {
    ret = response;
  }
  return ret;
}
