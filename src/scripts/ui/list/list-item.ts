
import {View, attributes} from 'views';
import {template} from '../utils';
import * as utils from 'orange';
import {getMimeIcon} from '../mime-types';
import {AssetsModel} from '../../models/index'


@template('list-item')
@attributes({
    tagName: 'div',
    className: 'assets-list-item',
    ui: {
        remove: '.assets-list-item-close-button',
        name: '.name',
        mime: '.mime'
    },
    triggers: {
        'click @ui.remove': 'remove'
    },
    
    events: {
        'click': '_onClick',
        'dblclick': '_onDblClick'
    }
})
export class AssetsListItemView extends View<HTMLDivElement> {
    model: AssetsModel;
    
    onRender () {
        let model = this.model
		let mime = model.get('mime') //.replace(/\//, '-')
       
		//mime = MimeList[mime]
        utils.removeClass(this.ui['mime'], 'mime-unknown')
        mime = getMimeIcon(mime.replace(/\//, '-'));

		utils.addClass(this.ui['mime'], mime);

		this.ui['name'].textContent = utils.truncate(model.get('name')||model.get('filename'), 25)

        let url = model.getURL();

		let img = new Image();
		img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
		img.setAttribute('data-src', `${url}?thumbnail=true`)

		this.ui['mime'].parentNode.insertBefore(img, this.ui['mime']);
		this.ui['mime'].style.display = 'none'
		this.trigger('image')
    }
    
    private _onClick (e: Event) {
        e.preventDefault();
        let target = e.target;
        if (target === this.ui['remove']) return;

        this.triggerMethod('click', this.model);
    }
    
    private _onDblClick (e) {
        this.triggerMethod('dblclick', this.model);
    }
    
}
