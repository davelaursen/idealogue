var Bunyan = require('bunyan');

/*
USAGE:
Logging must be setup in config.json. Example:
  "logging": {
    "name": "idealogue",
    "level": "info",
    "streams": [
      {
        "type": "console"
      },
      {
        "type": "file",
        "path": "idealogue-info.log"
      },
      {
        "type": "file",
        "path": "idealogue-error.log",
        "level": "error"
      }
    ]
  }

  - 'name' and 'level' are optional (defaults are 'idealogue' and 'info', respectively)
  - 'type' must be either 'console' or 'file'
  - if 'type' is 'file', then an optional 'path' can be provided (default is 'idealogue.log')
  - 'level' can be overridden for each stream
  - if no streams are defined, a 'console' stream is created by default
 */
module.exports = function() {

    this.createLogger = function(options) {
        var loggingOptions = options || {},
            name = loggingOptions.name || 'idealogue',
            streams = loggingOptions.streams || [],
            level = loggingOptions.level || 'info',
            path = 'idealogue.log',
            logger;

        var bunyanStreams = [];
        for (var i = 0; i < streams.length; i++) {
            var type = streams[i].type;
            var streamLevel = streams[i].level || level;
            var streamPath = streams[i].path || path;

            if (type === 'console') {
                bunyanStreams[i] = {level: streamLevel, stream: process.stdout};
            }
            else if (type === 'file') {
                bunyanStreams[i] = {level: streamLevel, path: streamPath};
            }
        }

        if (bunyanStreams.length === 0) {
            bunyanStreams = [{level: 'info', stream: process.stdout}];
        }

        logger = Bunyan.createLogger({
            name: name,
            streams: bunyanStreams
        });

        return logger;
    };

};