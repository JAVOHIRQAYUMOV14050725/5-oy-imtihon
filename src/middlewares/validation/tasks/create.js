const Joi = require("joi")

const createTaskSchema = Joi.object().keys({
   
    title: Joi.string().required(),
    description: Joi.string().min(4).max(200).required(),
    company_id: Joi.string().required()
 
})

module.exports = createTaskSchema