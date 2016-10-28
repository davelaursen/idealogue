import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, URLSearchParams, Response } from '@angular/http';
import { IMap } from '../types/types';
import { Ajax, IResponse } from './ajax';

interface ICallbackFn {
    (res: Response): any
}

interface IInterceptorFn {
    (res: Response): Response;
}

@Injectable()
export class DataService {
    private _interceptor: IInterceptorFn = (res: Response) => res;

    constructor(private _$http: Http) { }

    /**
     * Sets the interceptor function.
     */
    setInterceptor(interceptor: IInterceptorFn) {
        this._interceptor = interceptor;
    }

    /**
     * Performs a GET request.
     * @param url - absolute or relative URL of the resource that is being requested
     * @param headers - map of strings or functions which return strings representing
     *        HTTP headers to send to the server. If the return value of a function is null,
     *        the header will not be sent. Functions accept a config object as an argument
     * @param params - map of strings or objects which will be turned to
     *        ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
     *        JSONified
     * @param config - additional request configuration properties
     */
    get(url: string, headers?: Headers, params?: URLSearchParams, config?: IMap<any>): Promise<any> {
        return this._makeCall('GET', url, null, headers, params, config);
    }

    /**
     * Performs a PUT request.
     * @param url - absolute or relative URL of the resource that is being requested
     * @param data - data to be sent as the request message data
     * @param headers - map of strings or functions which return strings representing
     *        HTTP headers to send to the server. If the return value of a function is null,
     *        the header will not be sent. Functions accept a config object as an argument.
     * @param config - additional request configuration properties
     */
    put(url: string, data: any, headers?: Headers, config?: IMap<any>): Promise<any> {
        return this._makeCall('PUT', url, data, headers, undefined, config);
    }

    /**
     * Performs a POST request.
     * @param url - absolute or relative URL of the resource that is being requested
     * @param data - data to be sent as the request message data
     * @param headers - map of strings or functions which return strings representing
     *        HTTP headers to send to the server. If the return value of a function is null,
     *        the header will not be sent. Functions accept a config object as an argument.
     * @param config - additional request configuration properties
     */
    post(url: string, data: any, headers?: Headers, config?: IMap<any>): Promise<any> {
        return this._makeCall('POST', url, data, headers, undefined, config);
    }

    /**
     * Performs a DELETE request.
     * @param url - absolute or relative URL of the resource that is being requested
     * @param headers - map of strings or functions which return strings representing
     *        HTTP headers to send to the server. If the return value of a function is null,
     *        the header will not be sent. Functions accept a config object as an argument.
     * @param config - additional request configuration properties
     */
    del(url: string, headers?: Headers, config?: IMap<any>): Promise<any> {
        return this._makeCall('DELETE', url, null, headers, undefined, config);
    }

    /**
     * Performs a HEAD request.
     * @param url - absolute or relative URL of the resource that is being requested
     * @param headers - map of strings or functions which return strings representing
     *        HTTP headers to send to the server. If the return value of a function is null,
     *        the header will not be sent. Functions accept a config object as an argument.
     * @param config - additional request configuration properties
     */
    head(url: string, headers?: Headers, config?: IMap<any>): Promise<any> {
        return this._makeCall('HEAD', url, null, headers, undefined, config);
    }

    /**
     * Execute an HTTP form post.
     * @param url - absolute or relative URL to post the form to
     * @param formData - the form data to post
     */
    formPost(url: string, formData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let ajax = new Ajax();
            ajax.POST(url, formData, undefined, (response => {
                if (response.status >= 100 && response.status <= 399) { // 100/200/300 series status codes (non-errors)
                    resolve(response);
                } else {
                    reject({ response: response });
                }
            }));
        });
    }

    /////////////////////
    // helpers

    /**
     * Execute an HTTP request.
     */
    private _makeCall(
        method: string, url: string, data: any, headers: Headers, params: URLSearchParams, config: IMap<any>
    ): Promise<any> {
        // create the request
        let req: RequestOptionsArgs = {
            method: method,
            body: data,
            headers: headers,
            search: params
        };

        // add any additional configuration properties to the request
        if (config) {
            for (let prop in config) {
                if (config.hasOwnProperty(prop)) {
                    req[prop] = config[prop];
                }
            }
        }
        return new Promise((resolve, reject) => {
            this._$http.request(url, req)
                .toPromise()
                .then(res => {
                    if (res.status >= 100 && res.status <= 399) { // 100/200/300 series status codes (non-errors)
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch(res => {
                    res = this._interceptor(res);
                    if (res) {
                        reject(res);
                    }
                });
        });
    }

}
