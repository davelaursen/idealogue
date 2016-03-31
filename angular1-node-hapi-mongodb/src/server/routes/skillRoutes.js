var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var SkillService = require('../services/skillService.js');

module.exports = function(config) {
    var skillSvc = new SkillService(config.db);

    return [
        {
            path: '/api/skills',
            method: 'GET',
            handler: function(request, reply) {
                skillSvc.getAll(
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        reply(obj || []);
                    }
                );
            },
            config: {
                description: 'Get all skills',
                auth: 'session',
                validate: { }
            }
        },
        {
            path: '/api/skills/{name}',
            method: 'PUT',
            handler: function(request, reply) {
                skillSvc.save(request.params.name,
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
                description: 'Creates or updates a skill',
                auth: 'session',
                validate: {
                    params: {
                        name: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/skills/{name}',
            method: 'DELETE',
            handler: function(request, reply) {
                skillSvc.remove(request.params.name,
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
                description: 'Remove an existing skill',
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
