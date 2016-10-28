'use strict';

export interface IResponse {
    status: number,
    body: any
}

export interface IAjax {
    GET(url: string, headers?: any, callback?: (r: IResponse)=>void): void;
    POST(url: string, data?: any, headers?: any, callback?: (r: IResponse)=>void): void;
    PUT(url: string, data?: any, headers?: any, callback?: (r: IResponse)=>void): void;
    DELETE(url: string, headers?: any, callback?: (r: IResponse)=>void): void;
}

interface ICallbackFn {
    (r: IResponse): void;
}

interface IHeaders {
    [k: string]: string
}

/**
 * A class that allows making AJAX calls when unable to use an Angular service (i.e. during the 'run'
 * phase when an Angular app is loaded).
 */
export class Ajax implements IAjax {
    constructor() {}

    /**
     * Performs a GET request (asynchronous by default).
     * @param url - the url to send the request to
     * @param headers - a dictionary object of headers to include
     * @param callback - the callback to execute after an asynchronous request completes
     */
    GET(url: string, headers?: IHeaders, callback?: ICallbackFn) {
        this._send(url, 'GET', null, headers, callback);
    }

    /**
     * Performs a POST request (asynchronous by default).
     * @param url - the url to send the request to
     * @param data - the data to send in the request
     * @param headers - a dictionary object of headers to include
     * @param callback - the callback to execute after an asynchronous request completes
     */
    POST(url: string, data?: any, headers?: IHeaders, callback?: ICallbackFn) {
        this._send(url, 'POST', data, headers, callback);
    }

    /**
     * Performs a PUT request (asynchronous by default).
     * @param url - the url to send the request to
     * @param data - the data to send in the request
     * @param headers - a dictionary object of headers to include
     * @param callback - the callback to execute after an asynchronous request completes
     */
    PUT(url: string, data?: any, headers?: IHeaders, callback?: ICallbackFn) {
        this._send(url, 'PUT', data, headers, callback);
    }

    /**
     * Performs a DELETE request (asynchronous by default).
     * @param url - the url to send the request to
     * @param headers - a dictionary object of headers to include
     * @param callback - the callback to execute after an asynchronous request completes
     */
    DELETE(url: string, headers?: IHeaders, callback?: ICallbackFn) {
        this._send(url, 'DELETE', null, headers, callback);
    }

    /////////////////////
    // helpers

    /**
     * Sends an HTTP request.
     * @param url - the url to send the request to
     * @param method - the HTTP method
     * @param data - the data to send in the request
     * @param headers - a dictionary object of headers to include
     * @param callback - the callback to execute after an asynchronous request completes
     */
    private _send(url: string, method: string, data?: any, headers?: IHeaders, callback?: ICallbackFn) {
        let x = new XMLHttpRequest();
        x.open(method, url);
        if (headers && typeof headers === 'object' && !Array.isArray(headers)) {
            for (let prop in headers) {
                if (headers.hasOwnProperty(prop)) {
                    x.setRequestHeader(prop, headers[prop]);
                }
            }
        }
        if (callback) {
            x.onreadystatechange = () => {
                if (x.readyState === 4) {
                    callback({
                        status: x.status,
                        body: x.response
                    });
                }
            };
        }
        x.send(data);
    }
}
