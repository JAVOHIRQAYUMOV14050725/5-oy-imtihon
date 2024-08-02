const Joi = require("joi")

const schema = Joi.object().keys({
    id: Joi.string().pattern(/^[0-9]+$/).required()
})

module.exports = schema