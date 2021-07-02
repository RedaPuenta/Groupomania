require("dotenv").config()
const cryptojs = require("crypto-js")
const db = require("../mysql/connectDB")

//! Middleware qui permet de savoir un email est déjà utilisé lors de l'inscription
module.exports = (req, res, next) => {
    
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()

    db.query(`
        SELECT COUNT(email) AS exist FROM user 
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