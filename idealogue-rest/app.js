var Hapi = require('hapi'),
    Joi = require('joi'),
    _ = require('underscore'),
    Mongo = require('mongodb'),
    config = require('./config.json'),
    configSchema = require('./configSchema.js'),
    AuthenticationHelper = require('./lib/helpers/authenticationHelper.js'),
    LoggingHelper = require('./lib/helpers/loggingHelper.js'),
    domain = require('domain').create(),
    logger, server, serverOptions, db;


// validate the config file before we do anything
var error = Joi.validate(config, configSchema);
if(error) {
    throw new Error('Application config did not match the schema: ' + error);
}

// initialize logger
logger = new LoggingHelper().createLogger(config.logging);


var startup = function() {
    serverOptions = {
        router: {
            isCaseSensitive: false
        },
        cors: {
            additionalHeaders: [
                'X-Requested-With',
                'X-Authorization'
            ],
            additionalExposedHeaders: [
                'Location',
                'Content-Range'
            ]
        }
    };

    server = new Hapi.Server(config.host, config.port, serverOptions);

    // initialize database connection before doing anything else
    initDbConnection(function() {
        initRoutes();
        server.start();
    });
};

var shutdown = function(evt, err) {
    if (err) {
        logger.error('Event: ' + evt + ' | Error: ' + err.stack);
    }
    else {
        logger.info('Event: ' + evt);
    }

    try {
        db.close();
        server.stop();
    }
    catch (ex) {
        logger.error('App shutdown threw an exception: ', ex);
    }

    var exitCode = (err) ? 1 : 0;
    setTimeout(function() {
        process.exit(exitCode);
    }, 500);
}

var initDbConnection = function(callback) {
    Mongo.MongoClient.connect(config.mongoConnectionString, {server: { poolSize: 10}}, function(err, _db) {
        if (err) {
            var message = 'Error connecting to Mongo database: ' + err;
            logger.fatal(message)
            throw new Error(message);
        }
        db = _db;
        callback();
    });
};

var initRoutes = function() {
    var i, Controller, controller,
        options = _.extend({}, config);

    var authenticationHelper = new AuthenticationHelper({ logger: logger, db: db });
    options.authProvider = authenticationHelper.name;
    options.db = db;

    // register auth provider before registering routes
    server.auth(authenticationHelper.name, { implementation: authenticationHelper });

    // register routes
    for (i = 0; i < config.controllers.length; i++) {
        Controller = require('./lib/controllers/' + config.controllers[i]);
        options.logger = logger;
        controller = new Controller(options);
        server.route(controller.getRoutes());
    }
};


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

// startup server within a domain so that we can handle errors and shutdown gracefully
domain.on('error', function(err) { shutdown('exit', err); });
domain.run(function() { startup(); });