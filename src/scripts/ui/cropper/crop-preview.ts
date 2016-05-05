
import {View, attributes} from 'views';
import {ICropping} from './interfaces';

@attributes({
    className: 'assets cropping-preview',
    ui: {
        image: 'img'
    }
})
export class CropPreView extends View<HTMLDivElement> {
    protected _cropping: ICropping;

    set cropping(cropping: ICropping) {
        this._cropping = cropping;
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

        return this;
    }

    update() {
        if (this._cropping == null || this.ui['image'] == null) return this;

        let el = this.ui['image'];

        let cropping = this._cropping;

        let cw = el.clientWidth,
            ch = el.clientHeight,
            rx = cw / cropping.width,
            ry = ch / cropping.height;
        let width = 0, height = 0;

        let e = {
            width: Math.round(rx * width) + 'px',
            height: Math.round(ry * height) + 'px',
            marginLeft: '-' + Math.round(rx * cropping.x) + 'px',
            marginTop: '-' + Math.round(ry * cropping.y) + 'px'
        }
        for (let key in e) {
            (<any>img).style[key] = e[key];
        }

    }


}