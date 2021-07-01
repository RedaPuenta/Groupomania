require("dotenv").config()
const cryptojs = require("crypto-js")
const db = require("../mysql/connectDB")

module.exports = (req, res, next) => {
    
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()

    db.query(`
        SELECT COUNT(email) AS exist FROM user 
        WHERE email=?`, 
        [emailUser], 
        
        function(error, results, fields){
        
            if (results[0].exist == 1) {

                next()

            } else {

                res.status(400).json({message: "Aucun compte n'est associé à cette email"})
                
            }

        }
    )  

}