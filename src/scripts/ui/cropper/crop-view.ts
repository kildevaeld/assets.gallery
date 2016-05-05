/// <reference path="../../../../typings/main.d.ts" />
import {View, ViewOptions ,attributes} from 'views';
import * as Cropper from 'cropperjs';
import {ICropper, ICropping} from './interfaces';

export interface CropViewOptions extends ViewOptions {
    aspectRatio?: number;
    resize: boolean;
}

@attributes({
    className: 'assets cropping-view',
    ui: {
        image: 'img'
    }
})
export class CropView extends View<HTMLDivElement> {
    private _cropper: ICropper;
    protected _cropping: ICropping;
    options: CropViewOptions;
    
    get cropper () {
        if (this._cropper != null) return this._cropper;
        if (this.ui['image'] == null) return null;
        
        return this.activate()._cropper;
    }
    
    get cropping () {
       return this._cropping;
    }
    
    set cropping(cropping: ICropping) {
        this._cropping = cropping
    }
    
    constructor(options:CropViewOptions = { resize: false }) {
        super(options);
        this.options = options;
    }
    
    activate() {
        if (this._cropper != null) {
            return this;
        }
        
        this._cropper = new Cropper(<HTMLImageElement>this.ui['image'], <any>{
           aspectRatio: this.options.aspectRatio,
           crop: (e) => {
               this._cropping = e.detail;
               this.trigger('crop', e.detail)
           },
           data: this.cropping,
           built: (e) => this.trigger('built', e)
        });
        
        return this;
    }
    
    deactivate () {
        if (this.cropper) {
            this._cropper.destroy();
            this._cropper = void 0;
        }
        return this;
    }
 
    render () {
        super.render();
        
        if (this.ui['image'] == null) {
            this.undelegateEvents();
            let image = document.createElement('img');
            this.el.appendChild(image);
            this.ui['image'] = image;
            this.delegateEvents();
        }
        
        return this;  
    }   
    
}