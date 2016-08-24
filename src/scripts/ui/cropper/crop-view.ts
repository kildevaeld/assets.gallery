import {View, ViewOptions ,attributes} from 'views';
import * as Cropper from 'cropperjs';
import {ICropper, ICropping} from './interfaces';
import {AssetsModel} from '../../models/index';
import {CropPreView} from './crop-preview';
import {getCropping, getImageSize} from '../utils';
import {extend} from 'orange';

function isFunction(a:any): a is Function {
    return (typeof a === 'function');
}

export interface CropViewOptions extends ViewOptions, cropperjs.CropperOptions {
    resize: boolean;
    previewView?: CropPreView;
}

@attributes({
    className: 'assets cropping-view',
    ui: {
        image: 'img'
    }
})
export class CropView extends View<HTMLDivElement> {
   model: AssetsModel;
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
        if (this.options.previewView) this.options.previewView.cropping = cropping;
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

        let o = this.options;
        
        let opts: cropperjs.CropperOptions =  {
            crop: e => {
                this._cropping = e.detail;

                if (this.options.previewView) {
                    this.options.previewView.cropping = this._cropping;
                }

                this.triggerMethod('crop', e.detail)
                if (isFunction(o.crop)) o.crop(e);
           },
           data: this.cropping,
           built: () => {
               this.triggerMethod('built');
               if (isFunction(o.built)) o.built();
           },
           cropstart: e => {
               this.triggerMethod('cropstart');
               if (isFunction(o.cropstart)) o.cropstart(e);
           },
           cropmove: e => {
               this.triggerMethod('cropmove', e);
               if (isFunction(o.cropmove)) o.cropmove(e);
           },
           cropend: e => {
               this.triggerMethod('cropend', e);
               if (isFunction(o.cropend)) o.cropend(e);
           }
        };

        opts = extend({}, this.options, opts);

        this._cropper = new Cropper(<HTMLImageElement>this.ui['image'], opts);
        
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
    
    onCrop (cropping: cropperjs.Data) {
        /*if (this.options.previewView) {
            this.options.previewView.cropping = cropping;
        }*/
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