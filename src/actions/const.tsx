export const REQUEST = 'REQUEST';

interface RequestType {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    LOADMORE: string;
    CANCEL: string;
    CLEAR: string;
}

export function action(type: string, payload = {}) {
    return { type, ...payload };
}

export function createRequestType(base: string): RequestType {
    return {
        REQUEST: `${base}_REQUEST`,
        SUCCESS: `${base}_SUCCESS`,
        FAILURE: `${base}_FAILURE`,
        LOADMORE: `${base}_LOADMORE`,
        CANCEL: `${base}_CANCEL`,
        CLEAR: `${base}_CLEAR`,
    };
}
