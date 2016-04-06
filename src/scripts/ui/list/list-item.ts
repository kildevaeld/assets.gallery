
import {View, attributes} from 'views';
import {template} from '../utils';
import * as utils from 'utilities';
import {getMimeIcon} from '../mime-types';
import {AssetsModel} from '../../models'


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
        e.preventDefault();
        this.trigger('dblclick', this.model);
    }
    
}

/*export const AssetsListItem = View.extend({
	template: templates['list-item'],
	className: 'assets-list-item',
	tagName: 'div',
	ui: {
		remove: '.assets-list-item-close-button',
		name: '.name',
		mime: '.mime'
	},
	triggers: {

		'click @ui.remove': 'remove'
	},
    events: {
        'click': function (e) {
            let target = e.target;
            e.preventDefault();
            if (target === this.ui.remove) return;

            this.triggerMethod('click', this.model);
        },
        'dblclick': function (e) {
            e.preventDefault();
            let target = e.target;
            if (target === this.ui.remove) return;
            
            this.triggerMethod('dblclick', this.model);
        }
    },
	onRender () {
		let model = this.model
		let mime = model.get('mime') //.replace(/\//, '-')
       
		//mime = MimeList[mime]
        html.removeClass(this.ui.mime, 'mime-unknown')
        mime = getMimeIcon(mime.replace(/\//, '-'));

		html.addClass(this.ui.mime, mime);

		this.ui.name.textContent = truncate(model.get('name')||model.get('filename'), 25)

        let url = model.getURL();

		let img = new Image();
		img.src = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI="
		img.setAttribute('data-src', `${url}?thumbnail=true`)

		this.ui.mime.parentNode.insertBefore(img, this.ui.mime);
		this.ui.mime.style.display = 'none'
		this.trigger('image')
		
        
	}
})*/