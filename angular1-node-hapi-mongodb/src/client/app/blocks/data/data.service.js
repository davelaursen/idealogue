(function() {
    'use strict';

    /**
     * dataService
     *
     * A service that provides functionality for making HTTP calls to a backend service.
     */
    angular
        .module('blocks.data')
        .factory('dataService', dataService);

    /**
     * Internal function that returns a dataService object.
     * @returns {object} the Angular service object
     */
    dataService.$inject = ['$http', '$q', 'util'];
    function dataService($http, $q, util) {
        var service = {
            execute: execute,
            get: get,
            put: put,
            post: post,
            del: del,
            formPost: formPost
        };

        return service;

        /////////////////////
        // service methods

        /**
         *
         * @param {object} data
         * @returns {deferred.promise}
         */
        function execute(data) {
            var url, callback, action;

            // allow callers to pass in the base URL that they want
            // default to baseServiceUrl if not defined
            url = util.pathJoin([data.baseUrl || '', data.url]);
            if (data.tokens) {
                url = util.detokenize(url, data.tokens);
            }

            callback = function(response) {
                return response.data;
            };

            action = util.isString(data.action) ? data.action.toLowerCase() : data.action;
            switch (action) {
                case 'get':
                    return get(url, data.headers, callback, data.cache, data.params, data.config);
                case 'put':
                    return put(url, data.payload, data.headers, callback, data.config);
                case 'post':
                    return post(url, data.payload, data.headers, callback, data.config);
                case 'del':
                case 'delete':
                    return del(url, data.headers, callback, data.config);
                case 'formpost':
                case 'form_post':
                    return formPost(url, data.payload, callback);
            }
            return null;
        }

        /**
         * Performs a GET request.
         * @param {string} url absolute or relative URL of the resource that is being requested
         * @param {object=} headers map of strings or functions which return strings representing
         *        HTTP headers to send to the server. If the return value of a function is null,
         *        the header will not be sent. Functions accept a config object as an argument
         * @param {function=} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @param {(boolean|Cache)=} cache if true, a default $http cache will be used to cache the
         *        GET request, otherwise if a cache instance built with $cacheFactory, this cache
         *        will be used for caching
         * @param {object.<string|object>=} params map of strings or objects which will be turned to
         *        ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
         *        JSONified
         * @param {object=} config additional request configuration properties
         * @returns {deferred.promise}
         */
        function get(url, headers, callback, cache, params, config) {
            return makeCall('GET', url, null, headers, callback, cache, params, config);
        }

        /**
         * Performs a PUT request.
         * @param {string} url absolute or relative URL of the resource that is being requested
         * @param {string|object} data data to be sent as the request message data
         * @param {object=} headers map of strings or functions which return strings representing
         *        HTTP headers to send to the server. If the return value of a function is null,
         *        the header will not be sent. Functions accept a config object as an argument.
         * @param {function=} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @param {object=} config additional request configuration properties
         * @returns {deferred.promise}
         */
        function put(url, data, headers, callback, config) {
            return makeCall('PUT', url, data, headers, callback, undefined, undefined, config);
        }

        /**
         * Performs a POST request.
         * @param {string} url absolute or relative URL of the resource that is being requested
         * @param {string|object} data data to be sent as the request message data.
         * @param {object=} headers map of strings or functions which return strings representing
         *        HTTP headers to send to the server. If the return value of a function is null,
         *        the header will not be sent. Functions accept a config object as an argument.
         * @param {function=} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @param {object=} config additional request configuration properties
         * @returns {deferred.promise}
         */
        function post(url, data, headers, callback, config) {
            return makeCall('POST', url, data, headers, callback, undefined, undefined, config);
        }

        /**
         * Performs a DELETE request.
         * @param {string} url absolute or relative URL of the resource that is being requested
         * @param {object} headers map of strings or functions which return strings representing
         *        HTTP headers to send to the server. If the return value of a function is null,
         *        the header will not be sent. Functions accept a config object as an argument.
         * @param {function} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @param {object} config additional request configuration properties
         * @returns {deferred.promise}
         */
        function del(url, headers, callback, config) {
            return makeCall('DELETE', url, null, headers, callback, undefined, undefined, config);
        }

        /**
         * Execute an HTTP form post.
         * @param {string} url absolute or relative URL to post the form to
         * @param {FormData} formData the form data to post
         * @param {function=} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @returns {deferred.promise}
         */
        function formPost(url, formData, callback) {
            var deferred, req;

            req = {
                method: 'POST',
                url: url,
                data: formData,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };

            deferred = $q.defer();

            $http(req).then(
                function(result) {
                    resolveDeferred(deferred, result, callback);
                },
                function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        /////////////////////
        // helpers

        /**
         * Execute an HTTP request.
         * @param {string} method the HTTP method that should be used for the call
         * @param {string} url absolute or relative URL of the resource that is being requested
         * @param {string|object} data data to be sent as the request message data.
         * @param {object} headers map of strings or functions which return strings representing
         *        HTTP headers to send to the server. If the return value of a function is null,
         *        the header will not be sent. Functions accept a config object as an argument.
         * @param {function} callback the callback function that should be called when the request
         *        completes to transform the data - should take the response data as a parameter
         *        and return the data that should be resolved by the promise
         * @param {boolean|Cache} cache if true, a default $http cache will be used to cache the
         *        GET request, otherwise if a cache instance built with $cacheFactory, this cache
         *        will be used for caching.
         * @param {object.<string|object>} getParams map of strings or objects which will be turned to
         *        ?key1=value1&key2=value2 after the url. If the value is not a string, it will be
         *        JSONified. getParams is only valid with a GET request.
         * @param {object} config additional request configuration properties
         * @returns {deferred.promise}
         */
        function makeCall(method, url, data, headers, callback, cache, getParams, config) {
            var deferred, req, prop;

            // if it is a get and cache is not defined then cache is true
            if (method === 'GET' && typeof cache === 'undefined') {
                cache = false;
            }

            // create the request
            req = {
                url: url,
                method: method,
                data: data,
                headers: headers,
                cache: cache,
                params: getParams
            };

            // add any additional configuration properties to the request
            if (config) {
                for (prop in config) {
                    if (config.hasOwnProperty(prop)) {
                        req[prop] = config[prop];
                    }
                }
            }

            deferred = $q.defer();

            $http(req).then(
                function(result) {
                    resolveDeferred(deferred, result, callback);
                },
                function(err) {
                    deferred.reject(err);
                }
            );

            return deferred.promise;
        }

        /**
         * Takes an HTTP response object and resolve or reject it.
         * @param {deferred} deferred the deferred promise object
         * @param {object} result the result object
         * @param {function} callback the callback function that should be invoked upon resolution,
         *        it should take the response data as a parameter and return the data that should
         *        be resolved by the promise
         */
        function resolveDeferred(deferred, result, callback) {
            if (isNonError(result.status)) {
                result = callback ? callback(result) : result;
                deferred.resolve(result);
            } else {
                deferred.reject({ code: 'ERR', result: result});
            }
        }

        /**
         * Examines an HTTP status code to determine if the response is an error response.
         * @param {number} status an HTTP response status code
         * @returns {boolean} true if the status code is an error code
         */
        function isNonError(status) {
            return status >= 100 && status <= 399; // 100/200/300 series status codes (non-errors)
        }

    }

})();
