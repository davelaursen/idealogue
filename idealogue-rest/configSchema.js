var T = require('joi').Types,
	schema = {};

schema.host = T.String().min(1).required();
schema.port = T.Number().integer().required();
schema.mongoConnectionString = T.String().min(1).required();
schema.controllers = T.Array().required();

schema.logging = T.Object({
    name: T.String().emptyOk(),
    level: T.String().emptyOk(),
    streams: T.Array().emptyOk()
}).optional();

module.exports = schema;