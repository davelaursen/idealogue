var Hapi = require('hapi');

module.exports = function(config) {
	var token,
		self = this,
		logger = config.logger,
        db = config.db,
		checkToken = function(token, callback) {
            // validate provided API key against apiKeys collection
            var collection = db.collection('apiKeys');
            collection.find({"_id": token}).nextObject([], function(err, doc) {
                if(err || doc === null) {
                    callback(null, false);
                }
                else {
                    callback(null, true);
                }
            });
		};

    this.name = 'fnordAuth';

	this.authenticate = function(request, callback) {
		token = request.raw.req.headers['authorization'];

		if (!token) {
            callback(Hapi.error.unauthorized('', self.name));
		}
		else {
			logger.debug('Validating token: ' + token);
			checkToken(token, function(err, isValid) {
				if (err) {
					return callback(Hapi.error.unauthorized('Unauthorized: ' + err.message));
				}
				if (isValid) {
					callback(null, {}, {artifacts: {}});
				}
				else {
					callback(Hapi.error.unauthorized('Unauthorized: Invalid token'));
				}
			});
		}
	};
};