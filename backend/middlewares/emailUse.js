require("dotenv").config()
const cryptojs = require("crypto-js")
const db = require("../mysql/connectDB")

exports.login = (req, res, next) => {

    const emailCrypt = cryptojs.HmacMD5(req.body.email, process.env.CRYPTOJS_SECRET).toString()

    db.query("SELECT COUNT(email) AS exist FROM user WHERE email=?", [emailCrypt], function(error, results, fields){
        // pas besoin de COUNT check juste si index existe
        if (results[0].exist == 1) {

            next()

        } else {

            res.status(400).json({message: "Aucun compte n'est associé à cette email"})
            
        }

    })  

}

exports.signup = (req, res, next) => {

    const emailCrypt = cryptojs.HmacMD5(req.body.email, process.env.CRYPTOJS_SECRET).toString()

    db.query("SELECT COUNT(email) AS exist FROM user WHERE email=?", [emailCrypt], function(error, results, fields){
        
        if (results[0].exist == 1) {

            res.status(400).json({message: "Cette email est déjà utilisé"})

        } else {

            next()
        }
    }) 

}