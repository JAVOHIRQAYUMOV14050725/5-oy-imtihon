const { verify } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const verifyToken = () => {
   return async(req, res, next) => {
    let { token } = req.headers

    if(!token){
        res.status(403).send({
            success: false,
            message: "Avval tokenni ber uka"
        })
        return
    }

    let { id } = verify(token)

    let [user] = await fetchData("Select * from users where id = $1", id)

    if(user){
      req.userId = user.id
      next()
    } else {
        res.status(403).send({
            success: false,
            message: "token xato"
        })
    }
   }
}

module.exports = verifyToken