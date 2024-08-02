const Joi = require("joi")

const updateTaskSchema = Joi.object().keys({
   
    title: Joi.string().required(),
    company_id: Joi.string().required(),
    description: Joi.string().min(4).max(200).required()
 
})

module.exports =updateTaskSchema