var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var UserService = require('../services/userService.js');

module.exports = function(config) {
    var userSvc = new UserService(config.db);

    return [
        {
            path: '/api/users/{id}',
            method: 'GET',
            handler: function(request, reply) {
                userSvc.getByID(request.params.id,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        reply(obj || Boom.notFound());
                    }
                );
            },
            config: {
                description: 'Get a single user by id',
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/users',
            method: 'GET',
            handler: function(request, reply) {
                var username = request.query.username;
                var search = request.query.search;

                if (username) {
                    userSvc.getByUsername(username,
                        function(err) {
                            reply(Boom.badImplementation());
                        },
                        function(obj) {
                            reply(obj ? [obj] : []);
                        }
                    );
                } else if (search) {
                    userSvc.search(search,
                        function(err) {
                            reply(Boom.badImplementation());
                        },
                        function(obj) {
                            reply(obj || []);
                        }
                    );
                } else {
                    userSvc.getAll(
                        function(err) {
                            reply(Boom.badImplementation());
                        },
                        function(obj) {
                            reply(obj || []);
                        }
                    );
                }
            },
            config: {
                description: 'Get all users',
                validate: { }
            }
        },
        {
            path: '/api/users',
            method: 'POST',
            handler: function(request, reply) {
                userSvc.insert(request.payload,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(user) {
                        reply(user).created('/api/users/' + user.id);
                    }
                );
            },
            config: {
                description: 'Creates a new user',
                validate: {
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: Joi.string().required(),
                        isEnabled: Joi.boolean().required(),
                        createdDate: Joi.string().required(),
                        updatedDate: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/users/{id}',
            method: 'PUT',
            handler: function(request, reply) {
                if (request.payload.hasOwnProperty('id') && request.params.id !== request.payload.id) {
                    return reply(Boom.badRequest(
                        'Unable to change the id on the resource. Please ensure the id in the path matches the id in the payload.'));
                }

                userSvc.update(request.payload,
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
                description: 'Updates an existing user',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        id: Joi.string().required(),
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: Joi.string().required(),
                        isEnabled: Joi.boolean().required(),
                        createdDate: Joi.string().required(),
                        updatedDate: Joi.string().required()
                    }
                }
            }
        },
        {
            path: '/api/users/{id}',
            method: 'DELETE',
            handler: function(request, reply) {
                userSvc.remove(request.params.id,
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
                description: 'Remove an existing user',
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }
        }
    ];

};
