var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var IdeaService = require('../services/ideaService.js');
var TagService = require('../services/tagService.js');
var SkillService = require('../services/skillService.js');
var TechnologyService = require('../services/technologyService.js');

module.exports = function(config) {
    var ideaSvc = new IdeaService(config.db);
    var tagSvc = new TagService(config.db);
    var skillSvc = new SkillService(config.db);
    var techSvc = new TechnologyService(config.db);

    return [
        {
            path: '/api/ideas/{id}',
            method: 'GET',
            handler: function(request, reply) {
                ideaSvc.getByID(request.params.id,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        reply(obj || Boom.notFound());
                    }
                );
            },
            config: {
                description: 'Get a single idea by id',
                auth: 'session',
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/ideas',
            method: 'GET',
            handler: function(request, reply) {
                var search = request.query.search;
                if (search) {
                    ideaSvc.search(search, error, success);
                } else {
                    ideaSvc.getAll(error, success);
                }

                function error(err) {
                    reply(Boom.badImplementation());
                }

                function success(obj) {
                    reply(obj || []);
                }
            },
            config: {
                description: 'Get all ideas',
                auth: 'session',
                validate: { }
            }
        },
        {
            path: '/api/ideas',
            method: 'POST',
            handler: function(request, reply) {
                ideaSvc.insert(request.payload,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(idea) {
                        if (idea === null) {
                            reply(Boom.badImplementation());
                        }
                        else {
                            var j;
                            for (j = 0; j < idea.tags.length; j++) {
                                tagSvc.save(idea.tags[j]);
                            }
                            for (j = 0; j < idea.skills.length; j++) {
                                skillSvc.save(idea.skills[j]);
                            }
                            for (j = 0; j < idea.technologies.length; j++) {
                                techSvc.save(idea.technologies[j]);
                            }
                            reply(idea).created('/api/ideas/' + idea.id);
                        }
                    }
                );
            },
            config: {
                description: 'Create a new idea',
                auth: 'session',
                validate: {
                    payload: {
                        name: Joi.string().required(),
                        summary: Joi.string().required().allow(''),
                        benefits: Joi.string().required().allow(''),
                        details: Joi.string().required().allow(''),
                        state: Joi.string().required(),
                        tags: Joi.array().required(),
                        skills: Joi.array().required(),
                        technologies: Joi.array().required(),
                        repo: Joi.string().required().allow(''),
                        proposers: Joi.array().required(),
                        contributors: Joi.array().required(),
                        contributorRequests: Joi.array().required(),
                        isPublic: Joi.boolean().required(),
                        votes: Joi.array().required(),
                        voteCount: Joi.number().required(),
                        comments: Joi.array().required(),
                        createdDate: Joi.string().required(),
                        updatedDate: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/ideas/{id}',
            method: 'PUT',
            handler: function(request, reply) {
                if (request.payload.hasOwnProperty('id') && request.params.id !== request.payload.id) {
                    return reply(Boom.badRequest(
                        'Unable to change the id on the resource. Please ensure the id in the path matches the id in the payload.'));
                }

                var idea = request.payload;
                ideaSvc.update(idea,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(successful) {
                        if (!successful) {
                            reply(Boom.notFound());
                        } else {
                            var j;
                            for (j = 0; j < idea.tags.length; j++) {
                                tagSvc.save(idea.tags[j]);
                            }
                            for (j = 0; j < idea.skills.length; j++) {
                                skillSvc.save(idea.skills[j]);
                            }
                            for (j = 0; j < idea.technologies.length; j++) {
                                techSvc.save(idea.technologies[j]);
                            }
                            reply().code(204);
                        }
                    }
                );
            },
            config: {
                description: 'Updates an existing idea',
                auth: 'session',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        id: Joi.string().required(),
                        name: Joi.string().required(),
                        summary: Joi.string().required().allow(''),
                        benefits: Joi.string().required().allow(''),
                        details: Joi.string().required().allow(''),
                        state: Joi.string().required(),
                        tags: Joi.array().required(),
                        skills: Joi.array().required(),
                        technologies: Joi.array().required(),
                        repo: Joi.string().required().allow(''),
                        proposers: Joi.array().required(),
                        contributors: Joi.array().required(),
                        contributorRequests: Joi.array().required(),
                        isPublic: Joi.boolean().required(),
                        votes: Joi.array().required(),
                        voteCount: Joi.number().required(),
                        comments: Joi.array().required(),
                        createdDate: Joi.string().required(),
                        updatedDate: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/ideas/{id}',
            method: 'DELETE',
            handler: function(request, reply) {
                ideaSvc.remove(request.params.id,
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
                description: 'Remove an existing idea',
                auth: 'session',
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
        }
    ];

};
