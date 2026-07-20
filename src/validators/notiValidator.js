const Joi = require('joi');

const notiSchema = Joi.object({
    message: Joi.string().min(1).max(300).required()
});

module.exports = { notiSchema };