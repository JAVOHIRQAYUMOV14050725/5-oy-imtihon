const Joi = require("joi")

const schema = Joi.object().keys({
    full_name: Joi.string(),
    login: Joi.string().min(4).max(20),
    password: Joi.string().min(4).max(20),
    company_id: Joi.string() 
})

module.exports = schema