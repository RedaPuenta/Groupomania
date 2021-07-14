require("dotenv").config()
const db = require("../mysql/connectDB")
const dbRequest = require("../mysql/dbRequest")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cryptojs = require("crypto-js")
const idGenerator = require ("uuid")

//! Fonction qui permet de créer un compte (ALL)
exports.signup = (req, res) => {

    //* On récupère le nom, le prénom, le password, l'email (crypte)
    const firstName = req.body.prenom.charAt(0).toUpperCase() + req.body.prenom.slice(1).toLowerCase()
    const lastName = req.body.nom.charAt(0).toUpperCase() + req.body.nom.slice(1).toLowerCase()
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()
    const passwordUser = req.body.password

    //* On configure un userId, une bio (défaut) et un avatar (défaut)
    const userId = idGenerator.v1()
    const avatar = `${req.protocol}://${req.get('host')}/media/avatar/default.png`
    const bio = "Salut tout le monde !"

    //* On hash et on sale le mot de passe
    bcrypt.hash(passwordUser, 10)

    //: Promesses
    .then((hash) => {   

        //* On créer un nouvelle utilisateur dans la base de donnée
        db.query(dbRequest.register(emailUser, hash, firstName, lastName, userId, avatar, bio), function(error){

            //: Gestion des erreurs
            if(error == null){
                res.status(201).json({message: "Votre compte à été créé !"})   
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Votre compte n'a pas pu être créé !"})   
            }
        })
        
    })

    //: Promesses
    .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})
        
}

//! Fonction qui permet de se connecter (ALL)
exports.login = (req, res) => {
    
    //* On récupère l'email (crypte) et le mot de passe
    const emailUser = cryptojs.HmacMD5(req.body.email.toLowerCase(), process.env.CRYPTOJS_SECRET).toString()
    const passwordUser = req.body.password

    //* On récupère dans la base de donnéee le mot de passe des informations sur l'utilisateur
    //* Pour l'utilisateur --> userId, témoin de première connexion de l'utilisateur, password
    db.query(dbRequest.login(emailUser), function(error, results) {
           
        //: Gestion des erreurs
        if(error == null) {

            //* On compare le mot de passe la requête à celui de la base de donnée
            bcrypt.compare(passwordUser, results[0].password)    

            //: Promesse
            .then(valid => {
                
                //* Si le mot de passe ne correspond pas ...
                if(valid === false){

                    //* On envoie une réponse d'échec
                    res.status(401).json({message: "Le mot de passe est incorrect !"})
                
                //* Sinon ...
                } else {

                    //* On envoie une réponse de succès
                    //* userId, token (6 mois) et témoin de première connexion
                    res.status(200).json({
                        userId: results[0].userId,
                        token: jwt.sign({userId: results[0].userId}, process.env.JWT_SECRET, {expiresIn: 6 * 31 * 24 * 60 * 60}),
                        firstConnection: results[0].firstConnection
                    })
                
                }

            }) 

            //: Promesses
            .catch(() => {res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})})

        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
    })    
}

//! Fonction qui permet de bloquer l'accès au site sans connexion préalable (USER)
exports.access = (req, res) => {

    //: Gestion des erreurs
    try {

        //* Si il y a il une en-tête d'autorisation et un "id" dans les paramètres de la requêtes ...
        if (req.headers.authorization && req.params.id) {

            //* On décode le token de la requête pour récupérer le "userId" qui est dissimulé
            const tokenClient = req.headers.authorization.split(" ")[1]
            const decodedToken = jwt.verify(tokenClient, process.env.JWT_SECRET)
            const userIdDecoded = decodedToken.userId

            //* On récupère le "userId" de l'utilisateur qui se connecte
            const userIdClient = req.params.id
            
            //* Si le "userId" de l'utilisateur qui se connecte est différent de celui qui a été décodé dans le token ...
            if (userIdClient !== userIdDecoded){

                //* On envoie une réponse d'échec
                res.status(498).json({message: "Le token a expiré"})
            
            //* Sinon ...
            } else {

                //* On envoie réponse de succès
                res.status(200).json({message: "L'accès est autorisé"})

            }
        
        //* Sinon ...
        } else {

            //* On envoie une réponse d'échec
            res.status(401).json({message: "L'accès n'est pas autorisé"})

        }

    //: Gestion des erreurs
    } catch {
        res.status(498).json({message: "Le token est invalide"})
    }

}