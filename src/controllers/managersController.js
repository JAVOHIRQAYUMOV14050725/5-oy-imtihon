const verifyRole = require("../middlewares/verifyRole");
const { fetchData } = require("../utils/postgres")


const getAllWorkers = async(req, res) => {
    try {
      let users = await fetchData("select * from users where role='worker' ")
      if (users.length === 0) {
        return res.status(404).send({
            success: false,
            message: " worker topilmadi"
        });
      }
      res.send({
        success: true,
        data: users
      })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}




const createWorker = async(req, res) => {
   try {
    let { full_name, login, password,company_id } = req.body

    fetchData("Insert into users(full_name, login, password,company_id, role) values($1, $2, $3, $4,$5)", full_name, login, password,company_id, "worker")

    res.send({
        success: true,
        message: "Yaratildi"
    })
   } catch (error) {
    res.status(error.status || 403).send({
        success: false,
        message: error.message
    })
   }
}

const updateWorker = async(req, res) => {
    try {
        let { full_name, login, password,company_id } = req.body
        let {id} = req.params
        let [users] = await fetchData("Select * from users where id = $1 And role='worker'", id)
        fetchData("Update users set full_name = $1, login = $2, password = $3, company_id = $4 where id = $5 ", full_name || users.full_name, login || users.login, password || users.password,company_id||users.company_id, id,)

        res.send({
            success: true,
            message: "Yangilandi"
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const deleteWorker = async(req, res) => {
    try {
        let {id } = req.params
        let role
        if(role='worker'){
        await fetchData("DELETE FROM users WHERE id = $1 And role=$2",id,role)
      
        res.send({
            success: true,
            message: "O'chirildi"
        })
    }else{
        res.status(403).send({
            success: false,
            message: "Bu user worker emas"
        })
        return;
    }

        
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
        
    }
}

const getOneWorker = async(req, res) => {
    try {
        let { id } = req.params
        console.log(req.params);
        let [user] = await fetchData("SELECT * FROM users WHERE id = $1 And role='worker' ", id)
        console.log(user);
        if (!user) {
             res.status(404).send({
                success: false,
                message: "worker topilmadi"
            });
            return
        }
        res.send({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
 
}

module.exports = {
    getAllWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
    getOneWorker
  
}