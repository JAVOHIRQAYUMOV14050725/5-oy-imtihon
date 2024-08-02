const { verify } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const verifyRole = (...roles) => {
   return async(req, res, next) => {
    let { token } = req.headers

    if(!token){
        res.status(403).send({
            success: false,
            message: "Avval tokenni ber uka"
        })
        return
    }

    let decodedToken = verify(token);
    if(!decodedToken){
        res.status(403).send({
            success: false,
            message: "Token xato"
        })
        return;
    }

    const {id} = decodedToken;

    let [user] = await fetchData("Select * from users where id = $1 ", id)

    if(user){
       if(roles.find(el => el == user.role)){
        next()
       } else {
        res.status(403).send({
            success: false,
            message: "Sizga ruxsat yo'q"
        })
       }
    } else {
        res.status(403).send({
            success: false,
            message: "token xato"
        })
    }
   }
}

module.exports = verifyRole