var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var TagService = require('../services/tagService.js');

module.exports = function(config) {
    var tagSvc = new TagService(config.db);

    return [
        {
            path: '/api/tags',
            method: 'GET',
            handler: function(request, reply) {
                tagSvc.getAll(
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        reply(obj || []);
                    }
                );
            },
            config: {
                description: 'Get all tags',
                auth: 'session',
                validate: { }
            }
        },
        {
            path: '/api/tags/{name}',
            method: 'PUT',
            handler: function(request, reply) {
                tagSvc.save(request.params.name,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(doc, created) {
                        if (doc === null) {
                            reply(Boom.badImplementation());
                        } else {
                            reply().code(created ? 201 : 204);
                        }
                    }
                );
            },
            config: {
                description: 'Creates or updates a tag',
                auth: 'session',
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/tags/{name}',
            method: 'DELETE',
            handler: function(request, reply) {
                tagSvc.remove(request.params.name,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(successful) {
                        if (!successful) {
                            reply(Boom.notFound());
                        } else {
                            reply().code(204);
                        }
                    }
                );
            },
            config: {
                description: 'Remove an existing tag',
                auth: 'session',
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        }
    ];

};
