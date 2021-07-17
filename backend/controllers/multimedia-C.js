const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")
const dbRequest = require("../mysql/dbRequest")
const fs = require("fs")
const datefns = require("date-fns")
const { fr } = require("date-fns/locale")

//! Fonction qui permet de récupérer plusieurs contenus multimédia (USER)
exports.recover = (req, res) => {
    
    //* On récupère le "userId" de l'utilisateur et le filtre (préférence)
    const userId = req.body.userId
    const preference = req.body.preference

    //* On cherche le privilege de l'utilisateur dans la base de donnée
    db.query(dbRequest.privilegeUser(userId), function(error, results){

        //: Gestion des erreurs
        if(error == null) {

            //* On stock le privilege de l'utilisateur
            const privilege = results[0].privilege

            //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
            //-SELECT --> postId, userId, avatar, firstName, lastName, legend, media, likes, comments, my_post, my_like, my_comments, datePost
            const all = dbRequest.recoverAllPost(userId, 'multimedia')

            //* On détermine la requête SQL selon le filtre (préférence)
            switch(preference){

                //* Fil d'actualité
                case 1 : 
                    var sqlPreference = all 
                    var namePreference = "Fil d'actualité"
                break

                //* Mes publications
                case 2 :
                    var sqlPreference = `SELECT * FROM (${all}) my WHERE userId = '${userId}'`
                    var namePreference = "Mes publications"
                break

                //* Mes préférées
                case 3 : 
                    var sqlPreference = `SELECT * FROM (${all}) my WHERE my_like = 1`
                    var namePreference = "Mes préférées"
                break
                
            }

            //* On récupère dans la base de donnée les posts et les préférences de l'utilisateur liés à chacun de ces posts (selon le filtre)
            db.query(sqlPreference, function(error, results){
                
                //: Gestion des erreurs
                if(error == null) {
                    
                    //* Si le résultat n'est pas vide ...
                    if(results.length !== 0){
                    
                        //* On créer une variable qui va accueillir un résultat final
                        var new_results = []
                        //* On détermine le nombre de post récupérer (pour la boucle ci dessous)
                        var nombreResults = results.length - 1

                        //* Pour chaque post ...
                        for (let i = 0; i < results.length; i++) {

                            //* On récupère la liste de commentaire associés (maximum 3)
                            //-SELECT --> commentsId, userId, avatar, firstName, lastName, reaction, my_comments, dateComments
                            db.query(dbRequest.commentsList(userId, results[i].postId, 3), function(error, comments){

                                //* Pour chaque commentaire ...
                                for (let i = 0; i < comments.length; i++) {
                                    
                                    //* On transforme la date du commentaire
                                    comments[i].dateComments = datefns.formatDistanceStrict(Date.now(), comments[i].dateComments, {addSuffix: false, locale: fr})
                                    comments[i].dateComments = comments[i].dateComments.split(" ")[0] + comments[i].dateComments.split(" ")[1].slice(0,1)
                                    
                                }

                                //* On injecte les commentaires du post dans le résultat (maximum 3)
                                results[i].commentsList = comments

                                //* On transforme la date du post
                                results[i].datePost = datefns.formatDistanceStrict(Date.now(), results[i].datePost, {addSuffix: false, locale: fr})
                                //* On contruit l'url du fichier associées au post
                                results[i].media = `${req.protocol}://${req.get('host')}/media/${results[i].media}`
                                //* On donne une position au post (utile pour VUE.JS)
                                results[i].position = i

                                //* Et on monte le résultat final
                                new_results.push(results[i])
                                
                                //* Si il n'y a plus de post ...
                                if(i == nombreResults){

                                    //* On envoie une réponse de succès
                                    res.status(200).json({posts: new_results, privilege: privilege})
                                }
                            })

                        }
                    
                    //* Sinon, si le résultat est vide ...
                    } else {

                        //* On envoie une réponse d'échec
                        res.status(404).json({message: `Il n'y a pas de publication dans l'onglet (${namePreference})`})
                    }
                
                //: Gestion des erreurs
                } else {
                    res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                }
                
            })
        
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
            
    }) 

}

//! Fonction qui permet de récupérer un seule contenu multimédia (USER)
exports.recoverOne = (req, res) => {
     
    //* On récupère le "userId" de l'utilisateur et le "postId" du post
    const postId = req.body.postId
    const userId = req.body.userId

    //* On cherche le privilege de l'utilisateur dans la base de donnée
    db.query(dbRequest.privilegeUser(userId), function(error, results){

        //: Gestion des erreurs
        if(error == null){

            //* On stock le privilege de l'utilisateur
            const privilege = results[0].privilege

            //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
            //-SELECT --> postId, userId, avatar, firstName, lastName, legend, media, likes, comments, my_post, my_like, my_comments, datePost
            const all = dbRequest.recoverAllPost(userId, 'multimedia')
            
            //* On détermine la requête SQL
            var sqlRecoverOne = `SELECT * FROM (${all}) AS my WHERE postId = '${postId}'`
            
            //* On récupère dans la base de donnée le post en question et les préférences de l'utilisateur lié à ce post
            db.query(sqlRecoverOne, function(error, results) {
                    
                //: Gestion des erreurs
                if(error == null) {
                    
                    //* Si le résultat n'est pas vide ...
                    if(results.length !== 0){

                        //* On récupère la liste de commentaire associés à ce post (tout)
                        //-SELECT --> commentsId, userId, avatar, firstName, lastName, reaction, my_comments, dateComments
                        db.query(dbRequest.commentsList(userId, postId, 'none'), function(error, comments){

                            //: Gestion des erreurs
                            if(error == null) {

                                //* Pour chaque commentaire ...
                                for (let i = 0; i < comments.length; i++) {
                                    
                                    //* On transforme la date du commentaire
                                    comments[i].dateComments = datefns.formatDistanceStrict(Date.now(), comments[i].dateComments, {addSuffix: false, locale: fr})
                                    comments[i].dateComments = comments[i].dateComments.split(" ")[0] + comments[i].dateComments.split(" ")[1].slice(0,1)
                                    
                                }

                                //* On injecte les commentaires du post dans le résultat (tout)
                                results[0].commentsList = comments

                                //* On transforme la date du post
                                results[0].datePost = datefns.formatDistanceStrict(Date.now(), results[0].datePost, {addSuffix: false, locale: fr})
                                //* On contruit l'url du fichier associés au post
                                results[0].media = `${req.protocol}://${req.get('host')}/media/${results[0].media}`
                                //* On donne une position au post (utile pour VUE.JS)
                                results[0].position = 0
                                
                                //* On envoie une réponse de succès
                                res.status(200).json({posts: results, privilege: privilege})
                            
                            //: Gestion des erreurs
                            } else {
                                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                            }
                                
                        })
                    
                    //* Sinon, si le résultat est vide ...
                    } else {

                        //* On envoie une réponse d'échec
                        res.status(404).json({message: `Cette publication n'existe pas`})
                    }
                    
                //: Gestion des erreurs
                } else {
                    res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                }

            })
        
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })

    
}

//! Fonction qui permet de créer un contenu multimédia (USER)
exports.post = (req, res) => {
    
    //* On récupère le "userId" (propriétaire), l'url du fichier et la légende du post
    const userId = req.body.userId
    const media = req.file.filename
    const legend = req.body.legend

    //* On génère un "postId" pour la nouvelle publication
    const postId = idGenerator.v1()

    //* On créer un nouvelle publication dans la base de donnée
    db.query(dbRequest.newPostMultimedia(userId, postId, media, legend), function(error){

        //: Gestion des erreurs
        if(error == null){

            res.status(201).json({message: "Votre publication a été publiée !"})  

        //: Gestion des erreurs
        } else {
            
            //* On supprime le fichier précédemment télécharger par le serveur
            fs.unlink(`media/${media}`, (err) => {
                if (err) throw err
            })
            res.status(500).json({message: "Désolé, votre publication n'a pu être publiée !"})   
        }
    })
    
}

//! Fonction qui permet de supprimer un contenu multimédia (USER + ADMIN)
exports.deletePost = (req, res) => {
    
    //* On récupère le "postId" (contenu)
    const postId = req.params.postIdVerif

    //* On cherche dans la base de donnée le nom du fichier associé à ce "postId"
    db.query(dbRequest.selectCurrentFilePost(postId), function(error, results) {

        //: Gestion des erreurs
        if(error == null) {

            //* On stock le nom du fichier dans une variable
            const media = results[0].media
            
            //* On supprime le post de la base de donnée
            db.query(dbRequest.deletePost(postId, 'multimedia'), function(error){

                //: Gestion des erreurs
                if(error == null) {

                    //* On supprime le fichier qui était associé à ce post
                    fs.unlink(`media/${media}`, (err) => {
                        if (err) throw err
                    })

                    //* On supprime les commentaires associés à ce post
                    db.query(dbRequest.deleteCommentsForPost(postId), function(){

                        //* On supprime les likes associés à ce post
                        db.query(dbRequest.deleteLikesForPost(postId), function(){

                            res.status(200).json({message: "Félicitation, votre publication a été supprimée"})
                                
                        })

                    }) 
                    
                //: Gestion des erreurs
                } else {
                    res.status(500).json({message: "Désolé, votre publication n'a pu être supprimée !"})
                }

            })

        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
        
    })

}


