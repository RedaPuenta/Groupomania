const db = require("../mysql/connectDB")
const dbRequest = require("../mysql/dbRequest")

//! Fonction qui permet d'ajouter ou de révoquer un like (USER)
exports.like = (req, res) => {
    
    //* On récupère le "postId" (contenu) et le "userId" (propriétaire du like) 
    const postId = req.body.postId
    const userId = req.body.userId

    //* On cherche dans la base donnée si cette utilisateur à déjà liker
    db.query(dbRequest.likesOrDislikes(postId, userId), function(error, results){

        //: Gestion des erreurs
        if(error == null) {

            //* Si l'utlisateur à déjà liké le post ... (cela veut dire qu'il veut disliké)
            if(results[0].exist == 1){  

                //* On supprime le like de la base donnée
                db.query(dbRequest.dislikes(postId, userId), function(error){
                        
                    //: Gestion des erreurs
                    if(error == null) {
                        res.status(200).json({likes: 0, message: "Votre appréciation pour cette publication à révoquée"})
                    //: Gestion des erreurs
                    } else {
                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                    }
                    
                })  
            
            //* Sinon ... (cela veut dire que l'utilisateur veut liké)
            } else {

                //* On ajoute le like dans la base de donnée
                db.query(dbRequest.likes(postId, userId), function(error){
                        
                    //: Gestion des erreurs
                    if(error == null) {
                        res.status(201).json({likes: 1, message: "Votre appréciation pour cette publication à enrengistrée"})
                    //: Gestion des erreurs
                    } else {
                        res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                    }
                    
                })  
            }

        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
    })
}

//! Fonction qui permet de créer un commentaire (USER)
exports.comment = (req, res) => {

    //* On récupère le "postId" (publication), la réaction (commentaire) et son "userId" (propriétaire) 
    const postId = req.body.postId
    const userId = req.body.userId
    const reaction = req.body.reaction

    //* On créer un nouveau commentaire dans la base deconnée pour le post ciblée
    db.query(dbRequest.newComments(postId, userId, reaction), function(error){
            
        //: Gestion des erreurs
        if(error == null) {
            res.status(201).json({message: "Votre commentaire à été publié"})
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
        
    })  

}

//! Fonction qui permet de supprimer un commentaire (USER + ADMIN)
exports.deleteComments = (req, res) => {

    //* On récupère le "commentsIdVerif" du commentaire qui veut être supprimée 
    const commentsId = req.params.commentsIdVerif

    //* On supprime directement le commentaire
    db.query(dbRequest.deleteComments(commentsId), function(error){

        //: Gestion des erreurs
        if(error == null){
            res.status(200).json({message: "Votre commentaire à été supprimée"})
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })
        
}