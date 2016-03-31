var Path = require('path');
var Boom = require('boom');

module.exports = function() {
    return [
        {
            path: '/api/{param*}',
            method: 'GET',
            handler: function(request, reply) {
                reply(Boom.notFound());
            },
            config: {
                auth: false
            }
        },
        {
            path: '/node_modules/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: Path.join(__dirname, '../../../node_modules')
                }
            },
            config: {
                auth: false
            }
        },
        {
            path: '/bower_components/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: Path.join(__dirname, '../../../bower_components')
                }
            },
            config: {
                auth: false
            }
        },
        {
            path: '/assets/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: Path.join(__dirname, '../../client/assets')
                }
            },
            config: {
                auth: false
            }
        },
        {
            path: '/app/{param*}',
            method: 'GET',
            handler: {
                directory: {
                    path: Path.join(__dirname, '../../client/app')
                }
            },
            config: {
                auth: false
            }
        },
        {
            path: '/{param*}',
            method: 'GET',
            handler: {
                file: {
                    path: Path.join(__dirname, '../../client/index.html')
                }
            },
            config: {
                auth: false
            }
        }
    ];
};
