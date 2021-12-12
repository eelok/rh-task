const Joi = require("joi");

const manufacturerSchema = Joi.object({
    name: Joi.string().required().min(2),
    location: Joi.string(),
});

module.exports = { manufacturerSchema };
