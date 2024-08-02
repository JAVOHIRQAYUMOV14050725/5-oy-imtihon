const Joi = require("joi")

const schema = Joi.object().keys({
    name: Joi.string().max(100).required()
})

module.exports = schema