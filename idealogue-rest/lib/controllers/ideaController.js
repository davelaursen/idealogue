var Hapi = require('hapi'),
    IdeaService = require('../services/ideaService.js'),
    TagService = require('../services/tagService.js'),
    SkillService = require('../services/skillService.js'),
    TechnologyService = require('../services/technologyService.js');

module.exports = function IdeaController(config) {
    var logger = config.logger,
        db = config.db,
        authenticationProvider = config.authProvider || null,
        ideaSvc = new IdeaService(db),
        tagSvc = new TagService(db),
        skillSvc = new SkillService(db),
        techSvc = new TechnologyService(db),
        getAuth = function() { return authenticationProvider; };

    var routes = [
        {
            path: '/ideas/{id}',
            method: 'GET',
            handler: function(request, reply) {
                ideaSvc.getOne(request.params.id,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(obj) {
                        if (obj === null) {
                            reply(Hapi.error.notFound());
                        }
                        else {
                            reply(obj);
                        }
                    }
                );
            },
            config: {
                description: 'Get a single idea by id',
                auth: getAuth(),
                validate: {
                    path: {
                        id: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/ideas',
            method: 'GET',
            handler: function(request, reply) {
                ideaSvc.getMany(request.query.search,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(obj) {
                        if (obj === null) {
                            reply([]);
                        }
                        else {
                            reply(obj);
                        }
                    }
                );
            },
            config: {
                description: 'Get all ideas',
                auth: getAuth(),
                validate: { }
            }
        },
        {
            path: '/ideas',
            method: 'POST',
            handler: function(request, reply) {
                ideaSvc.create(request.payload,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(obj) {
                        if (obj === null) {
                            reply(Hapi.error.internal());
                        }
                        else {
                            var j;
                            for (j = 0; j < obj.tags.length; j++) {
                                tagSvc.save(obj.tags[j]);
                            }
                            for (j = 0; j < obj.skills.length; j++) {
                                skillSvc.save(obj.skills[j]);
                            }
                            for (j = 0; j < obj.technologies.length; j++) {
                                techSvc.save(obj.technologies[j]);
                            }
                            reply(obj).created('ideas/' + obj.id);
                        }
                    }
                );
            },
            config: {
                description: 'Create a new idea',
                auth: getAuth(),
                validate: {
                    payload: {
                        id: Hapi.types.String(),
                        name: Hapi.types.String().required(),
                        summary: Hapi.types.String().required(),
                        benefits: Hapi.types.String().required(),
                        details: Hapi.types.String().required(),
                        state: Hapi.types.String().required(),
                        tags: Hapi.types.Array().required(),
                        skills: Hapi.types.Array().required(),
                        technologies: Hapi.types.Array().required(),
                        repo: Hapi.types.String().required(),
                        proposers: Hapi.types.Array().required(),
                        contributors: Hapi.types.Array().required(),
                        contributorRequests: Hapi.types.Array().required(),
                        isPublic: Hapi.types.Boolean().required(),
                        votes: Hapi.types.Array().required(),
                        voteCount: Hapi.types.Number().required(),
                        comments: Hapi.types.Array().required(),
                        createdDate: Hapi.types.String().required(),
                        updatedDate: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/ideas/{id}',
            method: 'PUT',
            handler: function(request, reply) {
                if (request.payload.hasOwnProperty('id') && request.params.id !== request.payload.id) {
                    return reply(Hapi.error.badRequest('Unable to change the id on the resource. Please ensure the id in the path matches the id in the payload.'));
                }

                ideaSvc.update(request.payload,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(doc) {
                        if (doc === null) {
                            reply(Hapi.error.notFound());
                        }
                        else {
                            var j;
                            for (j = 0; j < doc.tags.length; j++) {
                                tagSvc.save(doc.tags[j]);
                            }
                            for (j = 0; j < doc.skills.length; j++) {
                                skillSvc.save(doc.skills[j]);
                            }
                            for (j = 0; j < doc.technologies.length; j++) {
                                techSvc.save(doc.technologies[j]);
                            }
                            reply(Hapi.response.Empty()).code(204);
                        }
                    }
                );
            },
            config: {
                description: 'Updates an existing idea',
                auth: getAuth(),
                validate: {
                    path: {
                        id: Hapi.types.String().required()
                    },
                    payload: {
                        id: Hapi.types.String().required(),
                        name: Hapi.types.String().required(),
                        summary: Hapi.types.String().required(),
                        benefits: Hapi.types.String().required(),
                        details: Hapi.types.String().required(),
                        state: Hapi.types.String().required(),
                        tags: Hapi.types.Array().required(),
                        skills: Hapi.types.Array().required(),
                        technologies: Hapi.types.Array().required(),
                        repo: Hapi.types.String().required(),
                        proposers: Hapi.types.Array().required(),
                        contributors: Hapi.types.Array().required(),
                        contributorRequests: Hapi.types.Array().required(),
                        isPublic: Hapi.types.Boolean().required(),
                        votes: Hapi.types.Array().required(),
                        voteCount: Hapi.types.Number().required(),
                        comments: Hapi.types.Array().required(),
                        createdDate: Hapi.types.String().required(),
                        updatedDate: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/ideas/{id}',
            method: 'DELETE',
            handler: function(request, reply) {
                ideaSvc.remove(request.params.id,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(successful) {
                        if (!successful) {
                            reply(Hapi.error.notFound());
                        }
                        else {
                            reply(Hapi.response.Empty()).code(204);
                        }
                    }
                );
            },
            config: {
                description: 'Remove an existing idea',
                auth: getAuth(),
                validate: {
                    path: {
                        id: Hapi.types.String().required()
                    }
                }
            }
        }
    ];

    this.getRoutes = function() {
        return routes;
    };

};