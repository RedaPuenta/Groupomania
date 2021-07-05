const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

//! Fonction qui permet de récupérer plusieurs contenus agora (USER)
exports.recover = (req, res, next) => {
    
    //* On récupère le "userId" de l'utilisateur et le filtre (préférence)
    const userId = req.body.userId
    const preference = req.body.preference

    //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
    //* Pour chaque post --> postId, userId, avatar, firstName, lastName, titre, likes, comments, my_post, my_like, my_comments, datePost
    const all = `
    SELECT req5.*, COUNT(forum.userId) AS my_post FROM (
        SELECT req4.*, COUNT(comments.userId) AS my_comments FROM (
			SELECT req3.*, COUNT(likes.userId) AS my_like FROM (
                    SELECT req2.*, user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar FROM (
                        SELECT req1.*, COUNT(likes.dateLikes) AS likes FROM (
                            SELECT forum.*, COUNT(comments.dateComments) AS comments
                            FROM comments
                            RIGHT JOIN forum
                            ON forum.postId = comments.postId
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
    LEFT JOIN forum
    ON forum.userId = req5.userId 
    AND forum.userId = ?
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
                            //* On donne une position (utile pour VUE.JS)
                            results[i].position = i
                            //* Et on monte le résultat final
                            new_results.push(results[i])

                            //* Si il n'y a plus de post ...
                            if(i == nombreResults){

                                //* On envoie une réponse de succès avec le résultat final
                                res.status(200).json(new_results)
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

}

//! Fonction qui permet de récupérer un seule contenu agora (USER)
exports.recoverOne = (req, res, next) => {
    
    //* On récupère le "userId" de l'utilisateur et le "postId" du post
    const postId = req.body.postId
    const userId = req.body.userId

    //* On stock la requête SQL qui récupère les posts et les préférences de l'utilisateur liés à chacun de ces posts
    //* Pour chaque post --> postId, userId, avatar, firstName, lastName, titre, likes, comments, my_post, my_like, my_comments, datePost
    const all = `
    SELECT req5.*, COUNT(forum.userId) AS my_post FROM (
        SELECT req4.*, COUNT(comments.userId) AS my_comments FROM (
			SELECT req3.*, COUNT(likes.userId) AS my_like FROM (
                    SELECT req2.*, user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar FROM (
                        SELECT req1.*, COUNT(likes.dateLikes) AS likes FROM (
                            SELECT forum.*, COUNT(comments.dateComments) AS comments
                            FROM comments
                            RIGHT JOIN forum
                            ON forum.postId = comments.postId
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
    LEFT JOIN forum
    ON forum.userId = req5.userId 
    AND forum.userId = ?
    GROUP BY req5.postId`

    //* On détermine la requête SQL
    var sql = `SELECT * FROM (${all}) AS my WHERE postId = ?`
    var params = [userId, userId, userId, postId]

    //* On récupère dans la base de donnée le post et les préférences de l'utilisateur liés à ce post
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

                            //* On envoie une réponse de succès avec le résultat
                            res.status(200).json(results)
                        
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

//! Fonction qui permet de créer un contenu agora (USER)
exports.post = (req, res, next) => {

    //* On récupère le "userId" (propriétaire) et le titre du post
    const userId = req.body.userId
    const titre = req.body.titre

    //* On génère un "postId" pour la nouvelle publication
    const postId = idGenerator.v1()

    //* On créer un nouvelle publication dans la base de donnée
    db.query(`
        INSERT INTO forum (userId, postId, titre, datePost) 
        VALUES(?, ?, ?, NOW())`, 
        [userId, postId, titre], 
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null){
                res.status(201).json({message: "Votre publication a été publiée !"})  

            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Désolé, votre publication n'a pu être publiée !"})   
            }
        }
    )
    
}

//! Fonction qui permet de supprimer un contenu agora (USER + ADMIN)
exports.deletePost = (req, res, next) => {
    
    //* On récupère le "postId" (contenu)
    const postId = req.params.postIdVerif
           
    //* On supprime le post de la base de donnée
    db.query(`
        DELETE FROM forum
        WHERE postId = ?
        `,
        [postId],
        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null) {
                res.status(200).json({message: "Félicitation, votre publication a été supprimée"})
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Désolé, votre publication n'a pu être supprimée !"})
            }

        }
    )
    
}
