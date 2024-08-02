



// const { fetchData } = require("../utils/postgres");

const { fetchData } = require("../utils/postgres");

// let createUser_task = async (req, res) => {
    

//   try {

//     let users= await fetchData("Select * from users where role='worker' ")
//     if (users.length === 0) {
//      return res.status(404).send({
//          success: false,
//          message: " worker role  topilmadi"
//      })
//    }else{

//     let { user_id, task_id } = req.body;

//     const start_at = new Date();
//     const end_at = new Date(start_at.getTime() + 36 * 60 * 60* 1000  ); 
//     let status;
//     if (end_at < new Date()) {
//       status = 'tekshirilmoqda';
//     } else {
//       status = 'ishlanmoqda';
//     }
    

//     await fetchData(`
//         INSERT INTO user_tasks (user_id, task_id, start_at, end_at, status)
//         VALUES ($1, $2, $3, $4, $5)
//       `, user_id, task_id, start_at, end_at, status)

//       res.send({
//         success: true,
//         message: 'Task created successfully'
//       });
//     }

//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: error.message
//     });


// }
// }

// const { fetchData } = require("../utils/postgres");

// let createUser_task = async (req, res) => {
//   try {
//     let {id, user_id, task_id } = req.body; // `id` foydalanuvchi IDsi sifatida olingan
// console.log(req.body);
//     // Foydalanuvchining roli 'worker' ekanligini tekshirish
//     let users = await fetchData(`
//       SELECT * FROM users WHERE id = $1 AND role = 'worker'
//     `, id);

//     if (users.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "Foydalanuvchi topilmadi yoki roli worker emas"
//       });
//     }

//     // Vazifa uchun vaqtlarni belgilash
//     const start_at = new Date();
//     const end_at = new Date(start_at.getTime() + 36 * 60 * 60 * 1000); // 36 soat

//     // Statusni aniqlash
//     let status = (end_at < new Date()) ? 'tekshirilmoqda' : 'ishlanmoqda';

//     // User_tasks jadvaliga yangi yozuv qo'shish
//     await fetchData(`
//       INSERT INTO user_tasks (user_id, task_id, start_at, end_at, status)
//       VALUES ($1, $2, $3, $4, $5)
//     `, [user_id, task_id, start_at, end_at, status]);

//     // Javob yuborish
//     res.send({
//       success: true,
//       message: 'Task successfully created for the worker.'
//     });
//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(500).send({
//       success: false,
//       message: error.message
//     });
//   }
// };


// const { fetchData } = require("../utils/postgres");

// let createUser_task = async (req, res) => {
//   try {
//     // req.body orqali olingan qiymatlar

//     let { user_id, task_id } = req.body;
 
//     let checkingUser = await fetchData(`
//       SELECT * FROM users  WHERE id=$1  
//     `,id);

//     const checkingTaskId = await fetch_data(
//         "select * from tasks Where id = $1",
//         task_id
//       );
   
//         const start_at = new Date();
//         const end_at = new Date(start_at.getTime() + 36 * 60 * 60 * 1000); // 36 soat
    
//         // Statusni aniqlash
//         let status
//         if (end_at < new Date()) {
//                   status = 'tekshirilmoqda';
//                 } else {
//                   status = 'ishlanmoqda';
//                 }

//     // User_tasks jadvaliga yangi yozuv qo'shish
//     await fetchData(`
//       INSERT INTO user_tasks (user_id, task_id, start_at, end_at, status)
//       VALUES ($1, $2, $3, $4, $5)
//     `, user_id, task_id, start_at, end_at, status);
 
//     res.send({
//       success: true,
//       message: 'Task successfully created for the worker.'
//     });

//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(500).send({
//       success: false,
//       message: 'Xatolik yuz berdi: ' + error.message
//     });
//   }

// };


const createUser_task = async (req, res) => {
    try {
      let { user_id, task_id, } = req.body;
  
      const [checking_user_tasks_table] = await fetchData(
        "select * from user_tasks where user_id = $1 and task_id = $2",
        user_id,
        task_id
      );
  
    
      if (!checking_user_tasks_table) {
     
       
  
        const checking_userRole = await fetchData(
          "select * from users "
        );
  
        const checking_userId = await fetchData(
          "select * from users where id = $1",
          user_id
        );
  
        const [checking_taskId] = await fetchData(
          "select * from tasks Where id = $1",
          task_id
        );
  
        console.log(checking_userRole.find(el =>  el.id == user_id).role );
        
                const start_at = new Date();
        const end_at = new Date(start_at.getTime() + 36 * 60 * 60 * 1000); // 36 soat
    
        // Statusni aniqlash
        let status
        if (end_at < new Date()) {
                  status = 'tekshirilmoqda';
                } else {
                  status = 'ishlanmoqda';
                }

        if (checking_userRole.find(el =>  el.id == user_id).role === 'worker' ) {
          if (checking_userId.length > 0) {
            if (checking_taskId) {
          
              await fetchData(
                "Insert Into user_tasks(user_id, task_id, start_at, end_at, status) Values($1, $2, $3, $4, $5)",
                user_id,
                task_id,
                start_at,
                end_at,
                status
              );
  
              const data_task = await fetchData("select * from user_tasks");
              res.status(200).send({
                success: true,
                message: "Created task",
                data: data_task.at(-1),
              });
            } else {
              res.status(404).send({
                success: false,
                message: "Bunday idga ega task yoq",
              });
            }
          } else {
            res.status(404).send({
              success: false,
              message: "Bunday idga ega worker yoq",
            });
          }
        } else {
          res.status(404).send({
            success: false,
            message:
              "Bu yerda workerlar uchun ish yaratilmoqda siz kiritgan userId workerniki emas",
          });
        }
      } else {
        res.status(404).send({
          success: false,
          message:
            "Already exists this is tasA task with the same title already exists for this company.",
        });
      }
    } catch (error) {
      res.status(error.status || 500).send({
        success: false,
        message: error.message,
      });
    }
  };






const getAllUser_task = async(req, res) => {
    try {
      let user_tasks = await fetchData("select * from user_tasks ")
      if (user_tasks.length === 0) {
        return res.status(404).send({
            success: false,
            message: " user_task topilmadi"
        });
      }
      res.send({
        success: true,
        data: user_tasks
      })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}




const getOneUser_task = async(req, res) => {
    try {
        let { id } = req.params
        console.log(req.params);
        let [user_tasks] = await fetchData("SELECT * FROM user_tasks WHERE id = $1  ", id)
        console.log(user_tasks);
        if (!user_tasks) {
             res.status(404).send({
                success: false,
                message: "user_task topilmadi"
            });
            return
        }
        res.send({
            success: true,
            data: user_tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
 
}



 const updateUser_task= async(req,res)=>{
    try {

        let { id } = req.params
        let { user_id, task_id } = req.body

        const start_at = new Date();
        const end_at = new Date(start_at.getTime() + 36 * 60 * 60* 1000  ); 
        let status;
        if (end_at < new Date()) {
          status = 'tekshirilmoqda';
        } else {
          status = 'ishlanmoqda';
        }
        await fetchData(`
            UPDATE user_tasks SET user_id=$1, task_id=$2, start_at=$3, end_at=$4, status=$5
            WHERE id=$6
        `, user_id, task_id, start_at, end_at, status, id)
        res.send({
            success: true,
            message: "user_task yengilandi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }

}





let deleteUser_task = async (req, res) => {
    try {
        let { id } = req.params

        let user_tasks = await fetchData("SELECT * FROM user_tasks WHERE id = $1", id);
    if (user_tasks.length === 0) {
      return res.status(404).send({
        success: false,
        message: "vazifa topilmadi"
      });
    }


    await fetchData("DELETE FROM user_tasks WHERE id = $1", id)
     
        res.send({
            success: true,
            message: "user_task o'chirildi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
 
}


let getByTaskId = async (req,res)=>{
    try {
        let { task_id } = req.params
        let user_tasks = await fetchData("SELECT * FROM user_tasks WHERE task_id = $1", task_id);
        if (user_tasks.length === 0) {
            return res.status(404).send({
                success: false,
                message: "user_task topilmadi"
            });
        }
        res.send({
            success: true,
            data: user_tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
 
}



let getByUserId = async (req,res) => {
    try {
        let { user_id } = req.params
        let user_tasks = await fetchData("SELECT * FROM user_tasks WHERE user_id = $1", user_id);
        if (user_tasks.length === 0) {
            return res.status(404).send({
                success: false,
                message: "user_task topilmadi"
            });
        }
        res.send({
            success: true,
            data: user_tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
  createUser_task,
  getAllUser_task,
  getOneUser_task,
  updateUser_task,
  deleteUser_task,
  getByTaskId,
 getByUserId,

}
