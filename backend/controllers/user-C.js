const db = require("../mysql/connectDB")
const fs = require("fs")

//! Fonction qui permet de récupérer toutes les informations relatives à la page "info" (ALL)
exports.info = (req, res, next) => {
    
    //* On récupère le "userId" de l'utilisateur qui demande des informations
    const userId = req.params.userId

    //* On récupère dans la base de donnée des informations sur l'utilisateur
    //* nom, prénom, bio, avatar
    db.query(`
        SELECT firstName, lastName, bio, avatar FROM user
        WHERE userId = ?`,
        [userId],
        function(error, results, fields) {

            //: Gestion des erreurs
            if(error == null) {

                //* Et on envoie une réponse de succès
                //* nom, prénom, bio, avatar
                res.status(200).json(results)

            //: Gestion des erreurs
            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
        }
    )

}

//! Fonction qui permet de récupérer toutes les informations relatives à la page "friends" (ALL)
exports.friends = (req, res, next)  => {

    //* On récupère le "userId" de l'utilisateur qui demande les informations
    const userId = req.params.userId
    
    //* On récupère dans la base de données des informations sur tout les autres utilisateurs (sauf celui qui demande)
    //* Avatar, prénom, nom, bio + nombre de contenu "agora" et "multimedia"
    db.query(`
        SELECT COUNT(forum.postId) As forum, user_media.userId, user_media.multimedia, user_media.firstName, user_media.lastName, user_media.avatar, user_media.bio, user_media.dateCreation FROM (
            SELECT COUNT(multimedia.postId) AS multimedia, user.userId, user.firstName, user.lastName, user.avatar, user.bio, user.dateCreation 
            FROM user
            LEFT JOIN multimedia
            ON multimedia.userId = user.userId
            GROUP BY user.userId
        ) AS user_media
        LEFT JOIN forum
        ON forum.userId = user_media.userId
        WHERE user_media.userId != ?
        GROUP BY user_media.userId`, 
        [userId],
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null) {

                //* Et on envoie une réponse de succès
                //* Avatar, prénom, nom, bio + nombre de contenu "agora" et "multimedia"
                res.status(200).json(results)

            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
        }
    )
    
}

//! Fonction qui permet de récupérer toutes les informations relatives à la page "Profil" (ALL)
exports.profil = (req, res, next)  => {
    
    //* On récupère le "userId" de l'utilisateur ciblé
    const userId = req.params.userId
    
    //* On récupère dans la base de données des informations sur l'utilisateur ciblées
    //* Avatar, prénom, nom, bio + nombre de contenu "agora" et "multimedia" + nombre de "like" et de "commentaire" 
    db.query(`
        SELECT COUNT(comments.userId) AS likes, score_comments.* FROM (
            SELECT COUNT(likes.userId) AS comments, score_likes.* FROM (
                SELECT COUNT(forum.postId) As forum, user_media.multimedia, user_media.userId, user_media.firstName, user_media.lastName, user_media.avatar, user_media.bio, user_media.dateCreation FROM (
                    SELECT COUNT(multimedia.postId) AS multimedia, user.userId, user.firstName, user.lastName, user.avatar, user.bio, user.dateCreation 
                    FROM user
                    LEFT JOIN multimedia
                    ON multimedia.userId = user.userId
                    GROUP BY user.userId
                ) AS user_media
                LEFT JOIN forum
                ON forum.userId = user_media.userId
                WHERE user_media.userId = ?
            ) AS score_likes
            LEFT JOIN likes
            ON likes.userId = score_likes.userId
            ) AS score_comments
            LEFT JOIN comments
            ON comments.userId = score_comments.userId`, 
        [userId],
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null) {

                //* On créer le score de "réaction" et de "participation" de l'utilisateur selon un algorithme
                const pts_likes = 14
                const pts_comments = 11
                const pts_multimedia = 17
                const pts_forum = 21
                let score_reaction = (parseInt(results[0].likes) * pts_likes) + (parseInt(results[0].comments) * pts_comments)
                let score_participation = (parseInt(results[0].multimedia) * pts_multimedia) + (parseInt(results[0].forum) * pts_forum)

                //* On envoie une réponse de succès
                //* avatar, nom, prénom, bio + nombre de contenu "agora" et "multimedia" + score de "réaction" et de "participation"
                res.status(200).json(
                    {
                    score_reaction: score_reaction, 
                    score_participation: score_participation,
                    avatar: results[0].avatar,
                    firstName: results[0].firstName,
                    lastName: results[0].lastName,
                    multimedia: results[0].multimedia,
                    agora: results[0].forum,
                    bio: results[0].bio
                    }
                )
            
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
        }
    )
    
}

//! Fonction qui permet de modifier les informations d'un utilisateur (USER + ADMIN)
exports.updateUser = (req, res, next) => {

    //* On récupère toutes les nouvelles informations
    const avatar = req.body.avatar
    const bio = req.body.bio
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.params.userIdVerif
    
    //* On remplace les anciennes informations par les nouvelles + témoin de première connexion (true)
    db.query(`
        UPDATE user SET 
        avatar = ?,
        bio = ?,
        firstName = ?,
        lastName = ?,
        firstConnection = "1"
        WHERE userId = ?
        `,
        [avatar, bio, firstName, lastName, userId],
        function(error, results, fields) {
            
            //: Gestion des erreurs
            if(error == null) {
                res.status(201).json({message: "Vos informations on été modifiées"})
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }

        }
    )
}

//! Fonction qui permet de supprimé un utilisateur (USER + ADMIN)
exports.deleteUser = (req, res, next) => {

    //* On récupère le "userId" de l'utlisateur qui doit être supprimée 
    const userId = req.params.userIdVerif

    //* On récupère dans la base de donnée tout les fichiers (url) associés à l'utilisateur
    db.query(`
        SELECT media FROM multimedia
        WHERE userId = ?`, 
        [userId],
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null){
                
                //* On stock les fichiers (url) associés à l'utilisateur
                const mediaUrl = results
                
                //* On supprime l'utilisateur dans la base de donnée
                db.query(`
                    DELETE FROM user 
                    WHERE userId = ?
                    `,
                    [userId],
                    function(error, results, fields) {
                        
                        //: Gestion des erreurs
                        if(error == null) {

                            //* On supprime tout les fichiers associés à l'utilisateurs dans le serveur
                            for (let i = 0; i < mediaUrl.length; i++) {
                                
                                fs.unlink(`media/${mediaUrl[i].media}`, (err) => {
                                    if (err) throw err
                                })
                                
                            }

                            res.status(200).json({message: "Votre compte à été supprimée"})
                        
                        //: Gestion des erreurs
                        } else {
                            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                        }

                    }
                )
            
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }

        }
    )

}