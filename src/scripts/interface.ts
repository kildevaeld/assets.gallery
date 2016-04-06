import {isString} from 'utilities';

export enum HttpMethod {
  GET, POST, PUT, DELETE
}

export abstract class AssetsError extends Error {
    name: string;
    message: string;
    status: number;
    constructor(status?:number|string, message?:string) {
        if (isString(status)) {
            message = <string>status;
            status = 200;
        } else if (arguments.length === 1) {
            message = "";
        }
        
        super(message);
        this.message = message;
        this.status = <number>status;
    }
    
    toJSON() {
        let out: any = {
            status: this.status,
            message: this.message
        };
        if (this.name) out.name = this.name;
        
        return out;
    }
}

export class HttpError extends AssetsError {

}

