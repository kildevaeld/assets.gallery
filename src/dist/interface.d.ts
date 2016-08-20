export declare enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
}
export declare abstract class AssetsError extends Error {
    name: string;
    message: string;
    status: number;
    constructor(status?: number | string, message?: string);
    toJSON(): any;
}
export declare class HttpError extends AssetsError {
}
