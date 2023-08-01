const Joi = require('joi');

const userschema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30),


    email: Joi.string()
        .email().required(),

    password: Joi.string()
        .min(3)
        .max(30)
        .required()

})

module.exports = userschema