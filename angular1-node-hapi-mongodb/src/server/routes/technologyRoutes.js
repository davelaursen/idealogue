var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var TechnologyService = require('../services/technologyService.js');

module.exports = function(config) {
    var techSvc = new TechnologyService(config.db);

    return [
        {
            path: '/api/technologies',
            method: 'GET',
            handler: function(request, reply) {
                techSvc.getAll(
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        reply(obj || []);
                    }
                );
            },
            config: {
                description: 'Get all technologies',
                auth: 'session',
                validate: { }
            }
        },
        {
            path: '/api/technologies/{name}',
            method: 'PUT',
            handler: function(request, reply) {
                techSvc.save(request.params.name,
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
                description: 'Creates or updates a technology',
                auth: 'session',
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/technologies/{name}',
            method: 'DELETE',
            handler: function(request, reply) {
                techSvc.remove(request.params.name,
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
                description: 'Remove an existing technology',
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
