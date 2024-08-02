const Joi = require("joi")

const updateUser_TaskSchema = Joi.object().keys({
  
    user_id: Joi.string().required(),
    task_id: Joi.string().required()
 
})



module.exports = updateUser_TaskSchema