require("dotenv").config()
const cryptojs = require("crypto-js")
const db = require("../mysql/connectDB")

module.exports = (req, res, next) => {

    const emailUser = cryptojs.HmacMD5(req.body.email, process.env.CRYPTOJS_SECRET).toString()

    db.query(`SELECT COUNT(email) AS exist FROM user 
        WHERE email=?`, 
        [emailUser], 
        function(error, results, fields){
        
            if (results[0].exist == 1) {

                res.status(400).json({message: "Cette email est déjà utilisé"})

            } else {

                next()
            }
            
        }
    ) 
}