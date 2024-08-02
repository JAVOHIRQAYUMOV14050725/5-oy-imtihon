const Joi = require("joi")

const createUser_TaskSchema = Joi.object().keys({
  
    user_id: Joi.string().required(),
    task_id: Joi.string().required()
 
})



module.exports = createUser_TaskSchema