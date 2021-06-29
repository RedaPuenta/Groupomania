require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cryptojs = require("crypto-js")
const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

exports.signup = (req, res, next) => {

    const userId = idGenerator.v1()
    const firstName = req.body.prenom
    const lastName = req.body.nom
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()
    const passwordUser = req.body.password
    const avatar = `${req.protocol}://${req.get('host')}/media/avatar-empty.png`
    const bio = "Salut tout le monde !"

    bcrypt.hash(passwordUser, 10)
    .then((hash) => {

        db.query(`INSERT INTO user (email, password, firstName, lastName, userId, avatar, bio, privilege, dateCreation, firstConnection) 
            VALUES(?, ?, ?, ?, ?, ?, ?, DEFAULT, NOW(), DEFAULT)`, 
            [emailUser, hash, firstName, lastName, userId, avatar, bio], 

            function(error, results, fields){

                if(error == null){

                    res.status(201).json({message: "Votre compte à été créé !"})   

                } else {

                    res.status(500).json({message: "Votre compte n'a pas pu être créé !"})   
                    
                }
            }
        )
        
    })
    .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})
        
}

exports.login = (req, res, next) => {

    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()
    const passwordUser = req.body.password

    db.query(`SELECT password FROM user 
        WHERE email=?`, 
        [emailUser], 

        function(error, results, fields) {
        
            bcrypt.compare(passwordUser, results[0].password)    
            .then(valid => {
                
                if(valid === false){

                    res.status(401).json({message: "Le mot de passe est incorrect !"})

                } else {

                    db.query(`SELECT userId FROM user 
                        WHERE email=?`, 
                        [emailUser], 

                        function(error, results, fields) {

                            if(error == null) {

                                res.status(200).json({
                                    userId: results[0].userId,
                                    token: jwt.sign({userId: results[0].userId}, process.env.JWT_SECRET, {expiresIn: 6 * 31 * 24 * 60 * 60})
                                })

                            } else {

                                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                            }

                        }
                    )
                }

            }) 
            .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})

        }
    )    
}