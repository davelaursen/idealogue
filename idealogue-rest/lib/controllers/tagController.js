var Hapi = require('hapi'),
    TagService = require('../services/tagService.js');

module.exports = function IdeaController(config) {
    var logger = config.logger,
        db = config.db,
        authenticationProvider = config.authProvider || null,
        tagSvc = new TagService(db),
        getAuth = function() { return authenticationProvider; };

    var routes = [
        {
            path: '/tags',
            method: 'GET',
            handler: function(request, reply) {
                console.log("TESTING");
                tagSvc.getMany(
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
                description: 'Get all tags',
                auth: getAuth(),
                validate: { }
            }
        },
        {
            path: '/tags/{tag}',
            method: 'PUT',
            handler: function(request, reply) {
                tagSvc.save(request.params.tag,
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
                description: 'Creates or updates a tag',
                auth: getAuth(),
                validate: {
                    path: {
                        tag: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/tags/{tag}',
            method: 'DELETE',
            handler: function(request, reply) {
                tagSvc.remove(request.params.tag,
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
                description: 'Remove an existing tag',
                auth: getAuth(),
                validate: {
                    path: {
                        tag: Hapi.types.String().required()
                    }
                }
            }
        }
    ];

    this.getRoutes = function() {
        return routes;
    };

};