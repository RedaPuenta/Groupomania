require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cryptojs = require("crypto-js")
const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

exports.signup = (req, res, next) => {

    const emailCrypt = cryptojs.HmacMD5(req.body.email, process.env.CRYPTOJS_SECRET).toString()
    const id = idGenerator.v1()

    bcrypt.hash(req.body.password, 10)
    .then((hash) => {

        db.query("INSERT INTO user (id, email, password, firstName, lastName, userId, avatar, bio, privilege, dateCreation, firstConnection) VALUES(NULL, ?, ?, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT, NOW(), DEFAULT)", 
        [emailCrypt, hash, req.body.nom, req.body.prenom, id], function(error, results, fields){

            if(results.affectedRows == 1){
                res.status(201).json({message: "Votre compte à été créé !"})   
            } 
        })
        
    })
    .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})
        
}

exports.login = (req, res, next) => {

    const emailCrypt = cryptojs.HmacMD5(req.body.email, process.env.CRYPTOJS_SECRET).toString()

    db.query('SELECT password from user WHERE email=?', [emailCrypt], function(error, results, fields) {
                    
        bcrypt.compare(req.body.password, results[0].password)    
        .then(valid => {

            if(!valid){

                res.status(401).json({message: "Le mot de passe est incorrect !"})

            } else {

                db.query('SELECT userId from user WHERE email=?', [emailCrypt], function(error, results, fields) {

                    res.status(200).json({
                        userId: results[0].userId,
                        token: jwt.sign({userId: results[0].userId}, process.env.JWT_SECRET, {expiresIn: "24h"})
                    })
                })
            }

        }) 
        .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})

    })    
}