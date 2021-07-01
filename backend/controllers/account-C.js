require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cryptojs = require("crypto-js")
const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

exports.signup = (req, res, next) => {

    const userId = idGenerator.v1()
    const firstName = req.body.prenom.charAt(0).toUpperCase() + req.body.prenom.slice(1).toLowerCase()
    const lastName = req.body.nom.charAt(0).toUpperCase() + req.body.nom.slice(1).toLowerCase()
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()
    const passwordUser = req.body.password
    const avatar = `${req.protocol}://${req.get('host')}/media/avatar/default.png`
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

                    db.query(`SELECT userId, firstConnection FROM user 
                        WHERE email=?`, 
                        [emailUser], 

                        function(error, results, fields) {

                            if(error == null) {

                                res.status(200).json({
                                    userId: results[0].userId,
                                    token: jwt.sign({userId: results[0].userId}, process.env.JWT_SECRET, {expiresIn: 6 * 31 * 24 * 60 * 60}),
                                    firstConnection: results[0].firstConnection
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

exports.access = (req, res, next) => {

    try {

        if (req.headers.authorization && req.body.userId) {

            const tokenClient = req.headers.authorization.split(" ")[1]
            const userIdClient = req.body.userId
            const decodedToken = jwt.verify(tokenClient, process.env.JWT_SECRET)
            const userIdDecoded = decodedToken.userId

            if (userIdClient !== userIdDecoded){

                res.status(498).json({message: "Le token a expiré"})
            
            } else {

                res.status(200).json({message: "L'accès est autorisé"})

            }

        } else {

            res.status(401).json({message: "L'accès n'est pas autorisé"})

        }


    } catch {

        res.status(498).json({message: "Le token est invalide"})

    }

}