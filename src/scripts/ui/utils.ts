
import templates from './templates';

export function template(name: string): ClassDecorator {
    return function <T extends Function>(target: T) {
        let t;
        if (!(t = templates[name])) {
            throw new Error('could not find template: ' + name)
        }
        target.prototype.template = t
    }
}


export function getImageSize(image): Promise<{ width: number; height: number; }> {

    const load = () => {
        return new Promise((resolve, reject) => {
            let i = new Image();
            i.onload = () => {
                resolve({
                    width: i.naturalWidth || i.width,
                    height: i.naturalHeight || i.height
                });
            };
            i.onerror = reject;
            i.src = image.src;
        });
    }

    if (image.naturalHeight === undefined) {
        return load();
    } else if (image.naturalHeight === 0) {
        return new Promise((resolve, reject) => {
            var time = setTimeout(() => {
                time = null;
                load().then(resolve, reject);
            }, 200)
            image.onload = () => {
                if (time !== null) {
                    clearTimeout(time);
                }
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                })
            }
        })

    } else {
        return Promise.resolve({
            width: image.naturalWidth,
            height: image.naturalHeight
        });
    }

}

export function getCropping(size: { width: number; height: number; }, ratio: number) {

    let width = size.width,
        height = size.height;

    let nh = height, nw = width;
    if (width > height) {
        nh = width / ratio;
    } else {
        nw = height * ratio;
    }

    return {
        x: 0,
        y: 0,
        width: nw,
        height: nh,
        rotate: 0,
        scaleX: 1,
        scaleY: 1
    };
}