const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")
const fs = require("fs")

//! Fonction qui permet de récupérer plusieurs contenus multimédia (USER)
exports.recover = (req, res, next) => {

    //* On récupère le "userId" de l'utilisateur
    const userId = req.body.userId
    
    const preference = req.body.preference

    const all = `
    SELECT my_post.*, COUNT(post.userId) AS my_post FROM (
        SELECT my_comments.*, COUNT(comments.userId) AS my_comments FROM (
                SELECT post_comments_likes_mylikes.*, COUNT(likes.userId) AS my_like FROM (
                    SELECT user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar, post_comments_likes.* FROM (
                        SELECT post_comments.*, COUNT(likes.dateLikes) AS likes FROM (
                            SELECT post.userId, post.postId AS post, post.datePost, post.media, post.legend, COUNT(comments.dateComments) AS comments
                            FROM comments
                            RIGHT JOIN post
                            ON post.postId = comments.postId
                            GROUP BY post
                        ) AS post_comments
                        LEFT JOIN likes
                        ON likes.postId = post_comments.post
                        GROUP BY post_comments.post
                    ) AS post_comments_likes
                    LEFT JOIN user
                    ON user.userId = post_comments_likes.userId
                ) AS post_comments_likes_mylikes
                LEFT JOIN likes
                ON post_comments_likes_mylikes.post = likes.postId 
                AND likes.userId = ?
                GROUP BY post_comments_likes_mylikes.post
            ) AS my_comments
            LEFT JOIN comments
            ON my_comments.post = comments.postId
            AND comments.userId = ?
            GROUP BY my_comments.post
            ORDER BY my_comments.datePost DESC
    ) AS my_post
    LEFT JOIN post
    ON post.userId = my_post.userId 
    AND post.userId = ?
    GROUP BY my_post.post`

    switch(preference){
        case 1 : 
            var sql = all 
            var params = [userId, userId, userId]
        break
        case 2 :
            var sql = 
            `SELECT * FROM (
                ${all}
            ) my
            WHERE userId = ?`
            var params = [userId, userId, userId, userId]
        break
        case 3 : 
            var sql = 
            `SELECT * FROM (
                ${all}
            ) my
            WHERE my_like = 1`
            var params = [userId, userId, userId]
        break
        default :
        var sql = all 
        var params = [userId, userId, userId]
    }

    //* On récupère dans la base de donnée les posts et les préférences de l'utilisateur liés à chacun de ces posts
    //* Pour chaque post --> avatar, prénom, nom, légende, total de likes et de commentaires + le nombre de like et de commentaire de l'utilisateur
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
                    //* Pour chaque commentaire --> avatar, nom, prénom, reaction (commentaire), my_comments
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
                        [results[i].post, userId],
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

//! Fonction qui permet de récupérer un seule contenu multimédia (USER)
exports.recoverOne = (req, res, next) => {
     
    //* On récupère le "userId" de l'utilisateur et le "postId" du post
    const postId = req.body.postId
    const userId = req.body.userId

     //* On récupère dans la base de donnée le post et les préférences de l'utilisateur liés à ce post
    //* Pour le post --> avatar, prénom, nom, légende, total de likes et de commentaires + le nombre de like et de commentaire de l'utilisateur
    db.query(`
        SELECT * FROM (
            SELECT post_comments_likes_mylikes.*, COUNT(likes.userId) AS my_like FROM (
                SELECT user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar, post_comments_likes.* FROM (
                    SELECT post_comments.*, COUNT(likes.dateLikes) AS likes FROM (
                        SELECT post.userId, post.postId AS post, post.datePost, post.media, post.legend, COUNT(comments.dateComments) AS comments
                        FROM comments
                        RIGHT JOIN post
                        ON post.postId = comments.postId
                        GROUP BY post
                    ) as post_comments
                    LEFT JOIN likes
                    ON likes.postId = post_comments.post
                    GROUP BY post_comments.post
                ) AS post_comments_likes
                LEFT JOIN user
                ON user.userId = post_comments_likes.userId
            ) AS post_comments_likes_mylikes
            LEFT JOIN likes
            ON post_comments_likes_mylikes.post = likes.postId 
            AND likes.userId = ?
            GROUP BY post_comments_likes_mylikes.post
            ORDER BY post_comments_likes_mylikes.datePost DESC
        ) AS focus
        WHERE focus.post = ?`,
        [userId, postId],
        function(error, results, fields) {
            
            //: Gestion des erreurs
            if(error == null && results[0] !== undefined) {
                
                //* On récupère la liste de commentaire associés à ce post (tout)
                //* Pour chaque commentaire --> avatar, nom, prénom, reaction (commentaire), my_comments
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

//! Fonction qui permet de créer un contenu (USER)
exports.post = (req, res, next) => {

    //* On récupère le "userId" (propriétaire), l'url du fichier et la légende du post
    const userId = req.body.userId
    const media = req.file.filename
    const legend = req.body.legend

    //* On génère un "postId" pour la nouvelle publication
    const postId = idGenerator.v1()

    //* On créer un nouvelle publication dans la base de donnée
    db.query(`
        INSERT INTO post (userId, postId, media, legend, type, datePost) 
        VALUES(?, ?, ?, ?, "media", NOW())`, 
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

//! Fonction qui permet de supprimer un post (USER + ADMIN)
exports.deletePost = (req, res, next) => {

    //*  
    const postId = req.params.postIdVerif
    
    db.query(`
        SELECT media FROM post
        WHERE postId = ?
        `,
        [postId],
        function(error, results, next) {

            //: Gestion des erreurs
            if(error == null) {

                const media = results[0].media
                
                db.query(`
                    DELETE FROM post
                    WHERE postId = ?
                    `,
                    [postId],
                    function(error, results, fields){

                        //: Gestion des erreurs
                        if(error == null) {

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

//! Fonction qui permet d'ajouter ou de révoquer un like (USER)
exports.like = (req, res, next) => {
    
    //* On récupère le "postId" (contenu) et le "userId" (propriétaire du like) 
    const postId = req.body.postId
    const userId = req.body.userId

    //* On cherche dans la base donnée si cette utilisateur à déjà liker
    db.query(`
        SELECT COUNT(userId) AS exist 
        FROM likes
        WHERE postId = ?
        AND userId = ?`, 
        [postId, userId],

        function(error, results, fields){

            //: Gestion des erreurs
            if(error == null ) {

                //* Si l'utlisateur à déjà liké le post ... (cela veut dire qu'il veut disliké)
                if(results[0].exist == 1){  

                    //* On supprime le like de la base donnée
                    db.query(`DELETE FROM likes
                        WHERE postId = ? AND userId = ?`,
                        [postId, userId],
                        function(error, results, fields){
                            
                            //: Gestion des erreurs
                            if(error == null) {
                                res.status(200).json({likes: 0, message: "Votre appréciation pour cette publication à révoquée"})
                            //: Gestion des erreurs
                            } else {
                                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                            }
                            
                        }
                    )  
                
                //* Sinon ... (cela veut dire que l'utilisateur veut liké)
                } else {

                    //* On ajoute le like dans la base de donnée
                    db.query(`INSERT INTO likes
                        VALUES(?, ?, NOW())`,
                        [postId, userId],
                        function(error, results, fields){
                            
                            //: Gestion des erreurs
                            if(error == null) {
                                res.status(201).json({likes: 1, message: "Votre appréciation pour cette publication à enrengistrée"})
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
}

//! Fonction qui permet de créer un commentaire (USER)
exports.comment = (req, res, next) => {

    //* On récupère le "postId" (publication), la réaction (commentaire) et son "userId" (propriétaire) 
    const postId = req.body.postId
    const userId = req.body.userId
    const reaction = req.body.reaction

    //* On créer un nouveau commentaire dans la base deconnée pour le post ciblée
    db.query(`
        INSERT INTO comments (id, postId, userId, reaction, dateComments)
        VALUES(NULL, ?, ?, ?, NOW())`,
        [postId, userId, reaction],
        function(error, results, fields){
            
            //: Gestion des erreurs
            if(error == null) {
                res.status(201).json({message: "Votre commentaire à été publié"})
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
            
        }
    )  

}

//! Fonction qui permet de supprimer un commentaire (USER + ADMIN)
exports.deleteComments = (req, res, next) => {

    //* On récupère le "commentsIdVerif" du commentaire qui veut être supprimée 
    const commentsId = req.params.commentsIdVerif

    //* On supprime directement le commentaire
    db.query(`
        DELETE FROM comments 
        WHERE id=?
        `,
        [commentsId],
        function(error){

            //: Gestion des erreurs
            if(error == null){
                res.status(200).json({message: "Votre commentaire à été supprimée"})
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }

        }
    )
        
}
