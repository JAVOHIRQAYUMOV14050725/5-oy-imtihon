const { sign } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const login = async(req, res) => {
    let { login, password } = req.body

    let [user] = await fetchData("Select * from users where login = $1 and password = $2", login, password)

    if(user){
       let token =  sign({id: user.id})
       res.send({
        success: true,
        role: user.role,
        token: token
       })
    } else {
        res.status(404).send({
            success: false,
            message: "Login yoki parol xato"
        })
    }
}

module.exports = {
    login
}