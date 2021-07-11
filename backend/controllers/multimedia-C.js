const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")
const fs = require("fs")

//! Fonction qui permet de récupérer plusieurs contenus multimédia (USER)
exports.recover = (req, res, next) => {

    //* On récupère le "userId" de l'utilisateur et le filtre (préférence)
    const userId = req.body.userId
    const preference = req.body.preference

    //* On cherche le privilege de l'utilisateur dans la base de donnée
    db.query(`
        SELECT privilege FROM user
        WHERE userId = ?`,
        [userId], 
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null) {

                //* On stock le privilege de l'utilisateur
                const privilege = results[0].privilege

                //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
                //* Pour chaque post --> postId, userId, avatar, firstName, lastName, legend, media, likes, comments, my_post, my_like, my_comments, datePost
                const all = `
                SELECT req5.*, COUNT(multimedia.userId) AS my_post FROM (
                    SELECT req4.*, COUNT(comments.userId) AS my_comments FROM (
                        SELECT req3.*, COUNT(likes.userId) AS my_like FROM (
                                SELECT req2.*, user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar FROM (
                                    SELECT req1.*, COUNT(likes.dateLikes) AS likes FROM (
                                        SELECT multimedia.*, COUNT(comments.dateComments) AS comments
                                        FROM comments
                                        RIGHT JOIN multimedia
                                        ON multimedia.postId = comments.postId
                                        GROUP BY postId
                                    ) AS req1
                                    LEFT JOIN likes
                                    ON likes.postId = req1.postId
                                    GROUP BY req1.postId
                                ) AS req2
                                LEFT JOIN user
                                ON user.userId = req2.userId
                            ) AS req3
                            LEFT JOIN likes
                            ON req3.postId = likes.postId 
                            AND likes.userId = ?
                            GROUP BY req3.postId
                        ) AS req4
                        LEFT JOIN comments
                        ON req4.postId = comments.postId
                        AND comments.userId = ?
                        GROUP BY req4.postId
                        ORDER BY req4.datePost DESC
                ) AS req5
                LEFT JOIN multimedia
                ON multimedia.userId = req5.userId 
                AND multimedia.userId = ?
                GROUP BY req5.postId`

                //* On détermine la requête SQL selon le filtre (préférence)
                switch(preference){

                    //* Fil d'actualité
                    case 1 : 
                        var sql = all 
                        var params = [userId, userId, userId]
                    break

                    //* Mes publications
                    case 2 :
                        var sql = `SELECT * FROM (${all}) my WHERE userId = ?`
                        var params = [userId, userId, userId, userId]
                    break

                    //* Mes préférées
                    case 3 : 
                        var sql = `SELECT * FROM (${all}) my WHERE my_like = 1`
                        var params = [userId, userId, userId]
                    break
                    default :
                    var sql = all 
                    var params = [userId, userId, userId]
                }

                //* On récupère dans la base de donnée les posts et les préférences de l'utilisateur liés à chacun de ces posts (selon le filtre)
                db.query(`${sql}`, params,
                    function(error, results, fields){
                        
                        //: Gestion des erreurs
                        if(error == null) {

                            //* On créer une variable qui va accueillir un résultat final
                            var new_results = []
                            //* On détermine le nombre de post récupérer (pour la boucle ci dessous)
                            var nombreResults = results.length - 1

                            //* Pour chaque post ...
                            for (let i = 0; i < results.length; i++) {

                                //* On récupère la liste de commentaire associés (maximum 3)
                                //* Pour chaque commentaire --> commentsId, userId, avatar, firstName, lastName, reaction, my_comments, dateComments
                                db.query(`
                                    SELECT my_comments.*,  COUNT(user.userId) AS my_comments FROM (
                                        SELECT user.avatar, user.firstName, user.userId, SUBSTRING(user.lastName, 1, 1) AS lastName, comments.id AS commentsId, comments.reaction, comments.dateComments 
                                        FROM comments
                                        LEFT JOIN user
                                        ON user.userId = comments.userId 
                                        WHERE comments.postId = ?
                                    LIMIT 3) AS my_comments
                                    LEFT JOIN user
                                    ON user.userId = my_comments.userId AND user.userId = ?
                                    GROUP BY my_comments.commentsId
                                    ORDER BY my_comments.dateComments ASC`, 
                                    [results[i].postId, userId],
                                    function(error, comments, fields){

                                        //* On injecte ses commentaires dans le résultat (maximum 3)
                                        results[i].commentsList = comments
                                        //* On contruit l'url du fichier associées 
                                        results[i].media = `${req.protocol}://${req.get('host')}/media/${results[i].media}`
                                        //* On donne une position (utile pour VUE.JS)
                                        results[i].position = i
                                        //* Et on monte le résultat final
                                        new_results.push(results[i])

                                        //* Si il n'y a plus de post ...
                                        if(i == nombreResults){

                                            //* On envoie une réponse de succès avec le résultat final et le privilege de l'utilisateur
                                            res.status(200).json({posts: new_results, privilege: privilege})
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
            
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
            
        }
    )

    

}

//! Fonction qui permet de récupérer un seule contenu multimédia (USER)
exports.recoverOne = (req, res, next) => {
     
    //* On récupère le "userId" de l'utilisateur et le "postId" du post
    const postId = req.body.postId
    const userId = req.body.userId

    //* On cherche le privilege de l'utilisateur dans la base de donnée
    db.query(`
        SELECT privilege FROM user
        WHERE userId = ?`,
        [userId], 
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null){

                //* On stock le privilege de l'utilisateur
                const privilege = results[0].privilege

                //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
                //* Pour chaque post --> postId, userId, avatar, firstName, lastName, legend, media, likes, comments, my_post, my_like, my_comments, datePost
                const all = `
                SELECT req5.*, COUNT(multimedia.userId) AS my_post FROM (
                    SELECT req4.*, COUNT(comments.userId) AS my_comments FROM (
                        SELECT req3.*, COUNT(likes.userId) AS my_like FROM (
                                SELECT req2.*, user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar FROM (
                                    SELECT req1.*, COUNT(likes.dateLikes) AS likes FROM (
                                        SELECT multimedia.*, COUNT(comments.dateComments) AS comments
                                        FROM comments
                                        RIGHT JOIN multimedia
                                        ON multimedia.postId = comments.postId
                                        GROUP BY postId
                                    ) AS req1
                                    LEFT JOIN likes
                                    ON likes.postId = req1.postId
                                    GROUP BY req1.postId
                                ) AS req2
                                LEFT JOIN user
                                ON user.userId = req2.userId
                            ) AS req3
                            LEFT JOIN likes
                            ON req3.postId = likes.postId 
                            AND likes.userId = ?
                            GROUP BY req3.postId
                        ) AS req4
                        LEFT JOIN comments
                        ON req4.postId = comments.postId
                        AND comments.userId = ?
                        GROUP BY req4.postId
                        ORDER BY req4.datePost DESC
                ) AS req5
                LEFT JOIN multimedia
                ON multimedia.userId = req5.userId 
                AND multimedia.userId = ?
                GROUP BY req5.postId`
                
                //* On détermine la requête SQL
                var sql = `SELECT * FROM (${all}) AS my WHERE postId = ?`
                var params = [userId, userId, userId, postId]  
                
                //* On récupère dans la base de donnée le post en question et les préférences de l'utilisateur lié à ce post
                db.query(sql, params,
                    function(error, results, fields) {
                        
                        //: Gestion des erreurs
                        if(error == null && results[0] !== undefined) {
                            
                            //* On récupère la liste de commentaire associés à ce post (tout)
                            //* Pour chaque commentaire --> commentsId, userId, avatar, firstName, lastName, reaction, my_comments, dateComments
                            db.query(`
                                SELECT my_comments.*,  COUNT(user.userId) AS my_comments FROM (
                                    SELECT user.avatar, user.firstName, user.userId, SUBSTRING(user.lastName, 1, 1) AS lastName, comments.id AS commentsId, comments.reaction, comments.dateComments 
                                    FROM comments
                                    LEFT JOIN user
                                    ON user.userId = comments.userId 
                                    WHERE comments.postId = ?
                                ) AS my_comments
                                LEFT JOIN user
                                ON user.userId = my_comments.userId AND user.userId = ?
                                GROUP BY my_comments.commentsId
                                ORDER BY my_comments.dateComments ASC`, 
                                [postId, userId],
                                function(error, comments, fields){

                                    //: Gestion des erreurs
                                    if(error == null) {

                                        //* On contruit l'url du fichier associés à ce post
                                        results[0].media = `${req.protocol}://${req.get('host')}/media/${results[0].media}`
                                        //* On injecte les commentaires de ce post dans le résultat (tout)
                                        results[0].commentsList = comments
                                        //* On donne une position (utile pour VUE.JS)
                                        results[0].position = 0

                                        //* On envoie une réponse de succès avec le résultat et le privilege de l'utilisateur
                                        res.status(200).json({posts: results, privilege: privilege})
                                    
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
            
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }

        }
    )

    
}

//! Fonction qui permet de créer un contenu multimédia (USER)
exports.post = (req, res, next) => {
    
    //* On récupère le "userId" (propriétaire), l'url du fichier et la légende du post
    const userId = req.body.userId
    const media = req.file.filename
    const legend = req.body.legend

    //* On génère un "postId" pour la nouvelle publication
    const postId = idGenerator.v1()

    //* On créer un nouvelle publication dans la base de donnée
    db.query(`
        INSERT INTO multimedia (userId, postId, media, legend, datePost) 
        VALUES(?, ?, ?, ?, NOW())`, 
        [userId, postId, media, legend], 
        function(error, results, fields){

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
        }
    )
    
}

//! Fonction qui permet de supprimer un contenu multimédia (USER + ADMIN)
exports.deletePost = (req, res, next) => {
    
    //* On récupère le "postId" (contenu)
    const postId = req.params.postIdVerif

    //* On cherche dans la base de donnée le nom du fichier associé à ce "postId"
    db.query(`
        SELECT media FROM multimedia
        WHERE postId = ?
        `,
        [postId],
        function(error, results, next) {

            //: Gestion des erreurs
            if(error == null) {

                //* On stock le nom du fichier dans une variable
                const media = results[0].media
                
                //* On supprime le post de la base de donnée
                db.query(`
                    DELETE FROM multimedia
                    WHERE postId = ?
                    `,
                    [postId],
                    function(error, results, fields){

                        //: Gestion des erreurs
                        if(error == null) {

                            //* On supprime le fichier qui était associé à ce post
                            fs.unlink(`media/${media}`, (err) => {
                                if (err) throw err
                            })

                            res.status(200).json({message: "Félicitation, votre publication a été supprimée"})
                        //: Gestion des erreurs
                        } else {
                            res.status(500).json({message: "Désolé, votre publication n'a pu être supprimée !"})
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
