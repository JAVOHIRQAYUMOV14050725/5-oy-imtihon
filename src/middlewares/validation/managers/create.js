const Joi = require("joi")

const schema = Joi.object().keys({
   
    full_name: Joi.string().required(),
    login: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(4).max(20).required(),
    company_id: Joi.string().required(),
})

module.exports = schema