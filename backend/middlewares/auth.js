require("dotenv").config()
const jwt = require("jsonwebtoken")
const db = require("../mysql/connectDB")

//! Middleware qui vérifie le token et les autorisations
module.exports = (req, res, next) => {
    
    //* Si le token est un token est authentique ...
    try {
        
        //* On récupère le token de la requête et on décode le "userId" qu'il dissimule
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userIdDecoded = decodedToken.userId

        //* Vérifier les droits pour la création d'un post, d'un commentaire, d'un like et pour la récupération des préférences d'un utilisateur pour des posts
        //* Si le "userId" de l'utilisateur ciblé est différent de l'émetteur ...
        if (req.body.userId && req.body.userId !== userIdDecoded) {
            
            res.status(498).json({message: "Le token est expiré ou vous n'avez pas le droit"})
        
        //* Vérifier les droits pour la modification ou la suppression d'un utilisateur
        //* Si il y a "userIdVerif" dans les paramètres de la requête et que celui ci est différent de l'émetteur ...
        } else if (req.params.userIdVerif && req.params.userIdVerif !== userIdDecoded) {
            
            //* On regarde dans la base de donnée si l'émetteur est un ADMIN
            db.query(`
                SELECT privilege FROM user
                WHERE userId = ?
                `,
                [userIdDecoded],
                function(error, results, fields){
                    
                    //: Gestion des erreurs
                    if(error == null){

                        //* Si l'utilisateur est ADMIN ...
                        if(results[0].privilege == 2) {

                            //* On pourra modifier ou supprimer un utilisateur
                            next()

                        //* Sinon ...
                        } else {

                            //* On envoie une réponse d'échec
                            res.status(498).json({message: "Le token est expiré ou vous n'avez pas le droit"})

                        }

                    //: Gestion des erreurs
                    } else {
                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                    }

                }
            )
        
        //* Vérifier les droits pour la suppression d'un commentaire
        //* Si il y a un "commentsIdVerif" dans les paramètres de la requête ...
        } else if (req.params.commentsIdVerif) {
            
            //* On récupère le "commentsId" du commentaire qui veut être supprimée
            const commentsId = req.params.commentsIdVerif

            //* On recherche dans la base de donnée, le privilège de l'émetteur de la requête
            db.query(`
                SELECT privilege FROM user
                WHERE userId=?
                `,
                [userIdDecoded],
                function(error, results){

                    //: Gestion des erreurs
                    if(error == null) {

                        //* Si l'émetteur de la requête est ADMIN ...
                        if(results[0].privilege == 2) {

                            //* On supprime le commentaire
                            next()
                        
                        //* Sinon ...
                        } else {
                            
                            //* On recherche dans la base de donnée si le "userId" du commentaire correspond à celui de l'émetteur
                            db.query(`
                                SELECT userId FROM comments
                                WHERE id= ?`,
                                [commentsId],
                                function(error, results){

                                    //: Gestion des erreurs
                                    if(error == null) { 
                                        
                                        //* Si le "userId" du commentaire ne correspond pas à celui de l'émetteur ...
                                        if(results[0].userId !== userIdDecoded){

                                            //* On envoie une réponse d'échec
                                            res.status(400).json({message: "Vous n'avez pas le droit de supprimer ce commentaire"})
                                        
                                        //* Sinon ...
                                        } else {

                                            //* On supprime le commentaire
                                            next()

                                        }
                                    
                                    //: Gestion des erreurs
                                    } else {
                                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                                    }

                                }
                            )

                        }
                    
                    //: Gestion des erreurs
                    } else {
                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                    }   
                }
            )

        //* Vérifier les droits pour la suppression d'un post
        //* Si il y a un "postIdVerif" dans les paramètres de la requête ...
        } else if(req.params.postIdVerif){
            
            //* On récupère le "postId" du commentaire qui veut être supprimée
            const postId = req.params.postIdVerif

            //* On recherche dans la base de donnée, le privilège de l'émetteur de la requête
            db.query(`
                SELECT privilege FROM user
                WHERE userId=?
                `,
                [userIdDecoded],
                function(error, results){

                    //: Gestion des erreurs
                    if(error == null) {

                        //* Si l'émetteur de la requête est ADMIN ...
                        if(results[0].privilege == 2) {

                            //* On supprime le post
                            next()
                        
                        //* Sinon ...
                        } else {
                            
                            //* On recherche dans la base de donnée si le "userId" du post correspond à celui de l'émetteur
                            db.query(`
                                SELECT userId FROM multimedia
                                WHERE postId = ?
                                UNION
                                SELECT userId FROM forum
                                WHERE postId = ?`,
                                [postId, postId],
                                function(error, results){

                                    //: Gestion des erreurs
                                    if(error == null) { 
                                        
                                        //* Si le "userId" du post ne correspond pas à celui de l'émetteur ...
                                        if(results[0].userId !== userIdDecoded){

                                            //* On envoie une réponse d'échec
                                            res.status(400).json({message: "Vous n'avez pas le droit de supprimer cette publication"})
                                        
                                        //* Sinon ...
                                        } else {

                                            //* On supprime le post
                                            next()

                                        }
                                    
                                    //: Gestion des erreurs
                                    } else {
                                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                                    }

                                }
                            )

                        }
                    
                    //: Gestion des erreurs
                    } else {
                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                    }   
                }
            )

        //* Sinon ... (Si y a pas de restriction)
        } else {
            
            //* On passe à la suite
            next()
        }
    
    //* Sinon, si le token n'est pas authentique ...
    } catch {
        
        //* On renvoie une réponse d'échec
        res.status(498).json({message: "Le token est invalide"})
        
    }
    
}