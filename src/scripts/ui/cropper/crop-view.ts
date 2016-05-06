/// <reference path="../../../../typings/main.d.ts" />
import {View, ViewOptions ,attributes} from 'views';
import * as Cropper from 'cropperjs';
import {ICropper, ICropping} from './interfaces';
import {AssetsModel} from '../../models';
import {CropPreView} from './crop-preview';
import {getCropping, getImageSize} from '../utils';

export interface CropViewOptions extends ViewOptions {
    aspectRatio?: number;
    resize: boolean;
    preview?: CropPreView;
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
        if (this.options.preview) this.options.preview.cropping = cropping;
    }
    
    setModel (model) {
        
        if (this.ui['image'] == null) return this;
        
        let image = <HTMLImageElement>this.ui['image'];
        
        if (model == null) {
            image.src = "";
            if (this.model) this.stopListening(this.model);
            this._model = model;
            return;
         }
        
        image.src = model.getURL();
        
        super.setModel(model);
        
        if (this.options.aspectRatio != null) {
            getImageSize(image).then( size => {
                this._cropping = getCropping(size, this.options.aspectRatio);
            }).catch(e => {
                this.trigger('error', e);
            });     
        }
        return this;
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
               this.triggerMethod('crop', e.detail)
           },
           data: this.cropping,
           built: (e) => this.triggerMethod('built', e),
           viewMode: 1
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
    
    toggle() {
        return this._cropper != null ? this.deactivate() : this.activate();
    }
    
    onCrop (cropping) {
        if (this.options.preview) {
            this.options.preview.cropping = cropping;
        }
    }
 
    render () {
        //super.render();
        this.triggerMethod('before:render');
        
        this.undelegateEvents();
        
        let image = this.el.querySelector('img');
        
        if (image == null) {
            image = document.createElement('img');
            this.el.appendChild(image);
        }
        
        this.delegateEvents();
        this.triggerMethod('render');
        
        return this;
       
    }
    
    destroy() {
        this.deactivate();
        super.destroy();
        
    } 
    
}