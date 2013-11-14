var Hapi = require('hapi'),
    UserService = require('../services/userService.js');

module.exports = function UserController(config) {
    var logger = config.logger,
        db = config.db,
        authenticationProvider = config.authProvider || null,
        userSvc = new UserService(db),
        getAuth = function() { return authenticationProvider; };

    var routes = [
        {
            path: '/users/{id}',
            method: 'GET',
            handler: function(request, reply) {
                userSvc.getOne(request.params.id,
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
                description: 'Get a single user by id',
                auth: getAuth(),
                validate: {
                    path: {
                        id: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/users',
            method: 'GET',
            handler: function(request, reply) {
                userSvc.getMany(
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
                description: 'Get all users',
                auth: getAuth(),
                validate: { }
            }
        },
        {
            path: '/users',
            method: 'POST',
            handler: function(request, reply) {
                userSvc.create(request.payload,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(obj) {
                        if (obj === null) {
                            reply(Hapi.error.internal());
                        }
                        else {
                            reply(obj).created('users/' + obj.id);
                        }
                    }
                );
            },
            config: {
                description: 'Create a new user',
                auth: getAuth(),
                validate: {
                    payload: {
                        id: Hapi.types.String(),
                        username: Hapi.types.String().required(),
                        firstName: Hapi.types.String().required(),
                        lastName: Hapi.types.String().required(),
                        email: Hapi.types.String().required(),
                        password: Hapi.types.String().required(),
                        isEnabled: Hapi.types.Boolean().required(),
                        createdDate: Hapi.types.String().required(),
                        updatedDate: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/users/{id}',
            method: 'PUT',
            handler: function(request, reply) {
                if (request.payload.hasOwnProperty('id') && request.params.id !== request.payload.id) {
                    return reply(Hapi.error.badRequest('Unable to change the id on the resource. Please ensure the id in the path matches the id in the payload.'));
                }

                userSvc.update(request.payload,
                    function(err) {
                        reply(Hapi.error.internal());
                    },
                    function(doc) {
                        if (doc === null) {
                            reply(Hapi.error.notFound());
                        }
                        else {
                            reply(Hapi.response.Empty()).code(204);
                        }
                    }
                );
            },
            config: {
                description: 'Updates an existing user',
                auth: getAuth(),
                validate: {
                    path: {
                        id: Hapi.types.String().required()
                    },
                    payload: {
                        id: Hapi.types.String().required(),
                        username: Hapi.types.String().required(),
                        firstName: Hapi.types.String().required(),
                        lastName: Hapi.types.String().required(),
                        email: Hapi.types.String().required(),
                        password: Hapi.types.String().required(),
                        isEnabled: Hapi.types.Boolean().required(),
                        createdDate: Hapi.types.String().required(),
                        updatedDate: Hapi.types.String().required()
                    }
                }
            }
        },
        {
            path: '/users/{id}',
            method: 'DELETE',
            handler: function(request, reply) {
                userSvc.remove(request.params.id,
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
                description: 'Remove an existing user',
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