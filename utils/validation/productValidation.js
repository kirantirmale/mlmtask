const Joi = require('joi');

const productschema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),


    price: Joi.number()
        .required(),

    description: Joi.string()
        .min(3)
        .max(30)
        .required()

})

module.exports = productschema