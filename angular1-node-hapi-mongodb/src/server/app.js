var Hapi = require('hapi');
var CookieAuth = require('hapi-auth-cookie');
var Inert = require('inert');
var Joi = require('joi');
var _ = require('underscore');
var domain = require('domain').create();
var Mongo = require('mongodb');

var config = require('./config.json');
var configSchema = require('./configSchema.js');
var LoggingHelper = require('./helpers/loggingHelper.js');

var authRoutes = require('./routes/authRoutes.js');
var userRoutes = require('./routes/userRoutes.js');
var ideaRoutes = require('./routes/ideaRoutes.js');
var skillRoutes = require('./routes/skillRoutes.js');
var tagRoutes = require('./routes/tagRoutes.js');
var technologyRoutes = require('./routes/technologyRoutes.js');
var staticRoutes = require('./routes/staticRoutes.js');

var logger, db;

validateConfig();
initializeLogger();
initializeProcessListeners();

// startup server within a domain so that we can handle errors and shutdown gracefully
domain.on('error', function(err) { shutdown('exit', err); });
domain.run(function() { startup(); });


function validateConfig() {
    Joi.validate(config, configSchema, function(err) {
        if (err) {
            throw new Error('Application config did not match the schema: ' + err);
        }
    });
}

function initializeLogger() {
    logger = new LoggingHelper().createLogger(config.logging);
}

function shutdown(evt, err) {
    if (err) {
        logger.error('Event: ' + evt + ' | Error: ' + err.stack);
    } else {
        logger.info('Event: ' + evt);
    }

    try {
        db.close();
        server.stop();
    }
    catch (ex) {
        logger.error('App shutdown threw an exception: ', ex);
    }

    var exitCode = err ? 1 : 0;
    setTimeout(function() {
        process.exit(exitCode);
    }, 500);
}

function startup() {
    var serverOptions = {
        connections: {
            router: { isCaseSensitive: false }
        }
    };

    server = new Hapi.Server(serverOptions);
    server.connection({ port: config.port })

    initDbConnection(function() {
        server.register(
            [CookieAuth, Inert],
            function(err) {
                if (err) {
                    throw err;
                }

                const cache = server.cache({
                    segment: 'sessions',
                    expiresIn: 1000 * 60 * 60 * 24  // 1 day
                });
                server.app.cache = cache;

                server.auth.strategy('session', 'cookie', true, {
                    password: 'idealogue_is_the_best_application_ever',
                    cookie: 'idealogue',
                    isSecure: false,
                    redirectTo: false,
                    ttl: 1000 * 60 * 60 * 24  // 1 day
                });

                initRoutes();

                server.start(function() {
                    console.log('Server ready');
                });
            }
        );
    });
}

function initDbConnection(callback) {
    Mongo.MongoClient.connect(config.mongoConnectionString, config.mongoOptions, function(err, _db) {
        if (err) {
            var message = 'Error connecting to Mongo database: ' + err;
            logger.fatal(message)
            throw new Error(message);
        }
        db = _db;

        // make sure ideas collection exists
        db.collection('ideas', { }, function(err, coll) {
            if (err) {
                db.createCollection('ideas', function(err, result) {
                    if (err) {
                        var message = 'Error creating full text index on Ideas collection: ' + err;
                        logger.fatal(message);
                        throw new Error(message);
                    }
                });
            }
        });

        // ensure full text index on ideas collection exists
        db.ensureIndex('ideas',
            {
                name: 'text',
                summary: 'text',
                benefits: 'text',
                details: 'text',
                tags: 'text',
                skills: 'text',
                technologies: 'text'
            },
            {
                weights: {
                    name: 10,
                    summary: 8,
                    benefits: 3,
                    details: 3
                }
            },
            function(err, indexname) {
                if (err) {
                    var message = 'Error creating full text index on Ideas collection: ' + err;
                    logger.fatal(message);
                    throw new Error(message);
                }
            }
        );

        // ensure full text index on users collection exists
        db.ensureIndex('users',
            {
                username: 'text',
                firstName: 'text',
                lastName: 'text',
                email: 'text'
            },
            {
                weights: {
                    username: 5,
                    firstName: 7,
                    lastName: 7,
                    email: 3
                }
            },
            function(err, indexname) {
                if (err) {
                    var message = 'Error creating full text index on Users collection: ' + err;
                    logger.fatal(message);
                    throw new Error(message);
                }
            }
        );

        callback();
    });
}

function initRoutes() {
    var options = _.extend({}, config);
    options.logger = logger;
    options.db = db;

    // register api routes
    server.route(authRoutes(options));
    server.route(userRoutes(options));
    server.route(ideaRoutes(options));
    server.route(skillRoutes(options));
    server.route(tagRoutes(options));
    server.route(technologyRoutes(options));

    // register static content routes
    server.route(staticRoutes());
}

function initializeProcessListeners() {
    // set up listeners for termination signals so that we can shutdown gracefully
    if (process.listeners('exit').length > 0 ||
        process.listeners('SIGTERM').length > 0 ||
        process.listeners('SIGINT').length > 0 ||
        process.listeners('SIGQUIT').length > 0 ||
        process.listeners('SIGHUP').length > 0) {
        logger.warn('ProcessManager: Listeners already exist for "exit", "SIGTERM", "SIGINT", "SIGQUIT", and/or "SIGHUP" - '
            + 'these listeners could interfere with the ProcessManager\'s ability to handle these signals appropriately '
            + 'and properly free up resources when shutting down.');
    }

    process.on('exit', function(){ shutdown('exit'); });
    process.on('SIGTERM', function(){ shutdown('SIGTERM'); });
    process.on('SIGINT', function(){ shutdown('SIGINT'); });
    process.on('SIGQUIT', function(){ shutdown('SIGQUIT'); });
    process.on('SIGHUP', function(){ shutdown('SIGHUP'); });
}
