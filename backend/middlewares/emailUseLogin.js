require("dotenv").config()
const cryptojs = require("crypto-js")
const db = require("../mysql/connectDB")
const dbRequest = require("../mysql/dbRequest")

//! Middleware qui permet de savoir un email est déjà associé à un utilisateur lors de la connexion
module.exports = (req, res, next) => {
    
    //* On récupère l'email de la requête et on la crypte selon avec le schéma universel
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()

    //* On regarde dans la base de donnée si l'email existe déjà
    db.query(dbRequest.emailUse(emailUser), function(error, results){

        //: Gestion des erreurs
        if(error == null) {
            
            //* Si il existe ...
            if (results[0].exist == 1) {

                //* On passe à la suite
                next()
            
            //* Sinon ...
            } else {

                //* On envoie une réponse d'échec
                res.status(400).json({message: "Aucun compte n'est associé à cette email"})
            }

        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })  

}