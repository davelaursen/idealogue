var Hapi = require('hapi');
var Joi = require('joi');
var Boom = require('boom');
var uuid = require('node-uuid');
var UserService = require('../services/userService.js');

module.exports = function(config) {
    var userSvc = new UserService(config.db);

    return [
        {
            path: '/api/login',
            method: 'POST',
            handler: function(request, reply) {
                userSvc.getByUsername(request.payload.username,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(user) {
                        if (request.auth.isAuthenticated) {
                            request.server.app.cache.set(request.auth.artifacts.sid, { user: user }, 0, function(err) {
                                if (err) {
                                    reply(err);
                                }
                                return reply(user);
                            });
                        } else if (user && user.password === request.payload.password) {
                            var sid = uuid.v1();
                            request.server.app.cache.set(sid, { user: user }, 0, function(err) {
                                if (err) {
                                    reply(err);
                                }
                                request.cookieAuth.set({ sid: sid });
                                return reply(user);
                            });
                        } else {
                            reply(Boom.unauthorized('Invalid email or password'));
                        }
                    }
                );
            },
            config: {
                auth: { mode: 'try' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false }},
                validate: {
                    payload: {
                        username: Joi.string().min(2).required(),
                        password: Joi.string().min(2).max(200).required()
                    }
                }
            }
        },
        {
            path: '/api/currentuser',
            method: 'GET',
            handler: function(request, reply) {
                if (request.auth.isAuthenticated) {
                    request.server.app.cache.get(request.auth.artifacts.sid, function(err, result) {
                        if (result && result.user) {
                            userSvc.getByID(result.user.id,
                                function(err) {
                                    reply(Boom.badImplementation());
                                },
                                function(obj) {
                                    reply(obj || Boom.notFound());
                                }
                            );
                        } else {
                            reply(Boom.notFound());
                        }
                    });
                } else {
                    reply(Boom.notFound());
                }
            }
        },
        {
            path: '/api/logout',
            method: 'GET',
            handler: function(request, reply) {
                request.cookieAuth.clear();
                reply('Logout Successful');
            },
            config: {
                auth: false
            }
        },
        {
            path: '/api/signup',
            method: 'POST',
            handler: function(request, reply) {
                userSvc.getByUsername(request.payload.username,
                    function(err) {
                        reply(Boom.badImplementation());
                    },
                    function(obj) {
                        if (obj) {
                            reply(Boom.badRequest('username is already in use - please enter a different username'));
                        } else {
                            userSvc.insert(request.payload,
                                function(err) {
                                    reply(Boom.badImplementation());
                                },
                                function(user) {
                                    reply(user).created('/api/users/' + user.id);
                                }
                            );
                        }
                    }
                );
            },
            config: {
                auth: false,
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
        }
    ];
};
