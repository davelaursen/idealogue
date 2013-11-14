var Hapi = require('hapi'),
    TechnologyService = require('../services/technologyService.js');

module.exports = function IdeaController(config) {
    var logger = config.logger,
        db = config.db,
        authenticationProvider = config.authProvider || null,
        techSvc = new TechnologyService(db),
        getAuth = function() { return authenticationProvider; };

    var routes = [
        {
            path: '/technologies',
            method: 'GET',
            handler: function(request, reply) {
                techSvc.getMany(
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
                description: 'Get all technologies',
                auth: getAuth(),
                validate: { }
            }
        },
        {
            path: '/technologies/{technology}',
            method: 'PUT',
            handler: function(request, reply) {
                techSvc.save(request.params.technology,
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
                description: 'Creates or updates a technology',
                auth: getAuth(),
                validate: {
                    path: {
                        technology: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/technologies/{technology}',
            method: 'DELETE',
            handler: function(request, reply) {
                techSvc.remove(request.params.technology,
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
                description: 'Remove an existing technology',
                auth: getAuth(),
                validate: {
                    path: {
                        technology: Hapi.types.String().required()
                    }
                }
            }
        }
    ];

    this.getRoutes = function() {
        return routes;
    };

};