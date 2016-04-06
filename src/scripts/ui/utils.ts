
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