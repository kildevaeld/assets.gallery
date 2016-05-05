
import {View, attributes} from 'views';
import {ICropping} from './interfaces';

@attributes({
    className: 'assets cropping-preview',
    ui: {
        image: 'img'
    },
    events: {
        'onload @ui.image': '_onImageLoad'
    }
})
export class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;
    private size: { width: number; height: number; };

    set cropping(cropping: ICropping) {
        this._cropping = cropping;
        this.update();
    }

    get cropping() {
        return this._cropping;
    }

    render() {
        super.render();

        if (this.ui['image'] == null) {
            this.undelegateEvents();
            let image = document.createElement('img');
            this.el.appendChild(image);
            this.ui['image'] = image;
            this.delegateEvents();

        }

        let image: any = this.ui['image'];
        if (image.src !== '') {
            this.size = {
                width: image.naturalWidth,
                height: image.naturalHeight
            };
        }
        
        image.style.maxHeight = '';
        image.style.maxWidth = '';

        return this;
    }

    update() {
        if (this._cropping == null || this.ui['image'] == null) return this;

        let img = this.ui['image'];
        let el = this.el;

        let cropping = this._cropping;

        let cw = el.clientWidth,
            ch = el.clientHeight,
            rx = cw / cropping.width,
            ry = ch / cropping.height;
        let width = 0, height = 0;

        if (this.size) {
            width = this.size.width;
            height = this.size.height;
        }

        let e = {
            width: Math.round(rx * width) + 'px',
            height: Math.round(ry * height) + 'px',
            marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
            marginTop: '-' + Math.round(ry * cropping.y) + 'px'
        }
       
        
        for (let key in e) {
            (<any>img).style[key] = e[key];
        }
        
        this.trigger('update');

    }


    private _onImageLoad() {
        let el: any = this.ui['image'];
        this.size = {
            width: el.naturalWidth || el.width,
            height: el.naturalHeight || el.height
        };
        this.trigger('onload', this.size);
    }

}