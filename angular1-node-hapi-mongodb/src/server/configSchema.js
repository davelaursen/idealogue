var Joi = require('Joi');

var schema = {
    port: Joi.number().integer().required(),
    mongoConnectionString: Joi.string().min(1).required(),
    mongoOptions: Joi.object({
        server: Joi.object({
            poolSize: Joi.number().integer().optional()
        }).optional()
    }).required(),
    logging: Joi.object({
        name: Joi.string(),
        level: Joi.string(),
        streams: Joi.array()
    }).optional()
};

module.exports = schema;
