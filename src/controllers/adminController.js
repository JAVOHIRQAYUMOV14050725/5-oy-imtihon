const { fetchData } = require("../utils/postgres")


const getAllManager = async(req, res) => {
    try {
      let users = await fetchData("select * from users where role='manager'")
      if (users.length === 0) {
        return res.status(404).send({
            success: false,
            message: "Muvaffakki manager topilmadi"
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




const createManager = async(req, res) => {
   try {
    let { full_name, login, password,company_id } = req.body

    fetchData("Insert into users(full_name, login, password,company_id, role) values($1, $2, $3, $4,$5)", full_name, login, password,company_id, "manager")

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

const updateManager= async(req, res) => {
    try {
        let { full_name, login, password,company_id } = req.body
        let {id} = req.params
        let role="manager"
        let [user] = await fetchData("Select * from users where id = $1 And role=$2", id,role)
        fetchData("Update users set full_name = $1, login = $2, password = $3, company_id = $4 where id = $5 ", full_name || user.full_name, login || user.login, password || user.password,company_id||user.company_id, id,)

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

const deleteManager = async(req, res) => {
    try {
        let { id } = req.params
        let role
     if(role="manager"){
        await fetchData("DELETE FROM users WHERE id = $1 And  role=$2",id,role)
        res.send({
            success: true,
            message: "O'chirildi"
        })
     }else{
        res.status(403).send({
            success: false,
            message: "Bu foydalanuvchi manager emas!"
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

const getOneManager = async(req, res) => {
    try {
        let { id } = req.params
      let role="manager"
        let [user] = await fetchData("SELECT * FROM users WHERE id = $1 And role=$2", id,role)
       
        if (!user) {
             res.status(404).send({
                success: false,
                message: "manager topilmadi"
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
    getAllManager,
     createManager,
    updateManager,
     deleteManager,
     getOneManager
  
}