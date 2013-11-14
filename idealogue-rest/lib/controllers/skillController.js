var Hapi = require('hapi'),
    SkillService = require('../services/skillService.js');

module.exports = function IdeaController(config) {
    var logger = config.logger,
        db = config.db,
        authenticationProvider = config.authProvider || null,
        skillSvc = new SkillService(db),
        getAuth = function() { return authenticationProvider; };

    var routes = [
        {
            path: '/skills',
            method: 'GET',
            handler: function(request, reply) {
                skillSvc.getMany(
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
                description: 'Get all skills',
                auth: getAuth(),
                validate: { }
            }
        },
        {
            path: '/skills/{skill}',
            method: 'PUT',
            handler: function(request, reply) {
                skillSvc.save(request.params.skill,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(doc, created) {
                        if (doc === null) {
                            reply(Hapi.error.internal());
                        }
                        else {
                            reply(Hapi.response.Empty()).code(created ? 201 : 204);
                        }
                    }
                );
            },
            config: {
                description: 'Creates or updates a skill',
                auth: getAuth(),
                validate: {
                    path: {
                        skill: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/skills/{skill}',
            method: 'DELETE',
            handler: function(request, reply) {
                skillSvc.remove(request.params.skill,
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
                description: 'Remove an existing skill',
                auth: getAuth(),
                validate: {
                    path: {
                        skill: Hapi.types.String().required()
                    }
                }
            }
        }
    ];

    this.getRoutes = function() {
        return routes;
    };

};