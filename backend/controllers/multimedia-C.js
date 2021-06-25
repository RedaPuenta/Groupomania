const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

exports.create = (req, res, next) => {

    const userId = req.body.userId
    const postId = idGenerator.v1()
    const media = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`
    const legend = req.body.legend

    db.query(`
        INSERT INTO post (userId, postId, media, legend, datePost) 
        VALUES(?, ?, ?, ?, NOW())`, 
        [userId, postId, media, legend], 

        function(error, results, fields){

            if(error == null){

                res.status(201).json({message: "Votre publication a été publiée !"})   

            } else {

                fs.unlink(`media/${media}`, (err) => {
                    if (err) throw err
                })
                res.status(500).json({message: "Désolé, votre publication n'a pu être publiée !"})   
            }
        }
    )
    
}

exports.recover = (req, res, next) => {

    const userId = req.body.userId
    
    db.query(`
            SELECT my_comments.*, COUNT(comments.userId) AS my_comments FROM (
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
            ) AS my_comments
            LEFT JOIN comments
            ON my_comments.post = comments.postId
            AND comments.userId = ?
            GROUP BY my_comments.post
            ORDER BY my_comments.datePost DESC`, 
        [userId, userId],
        
        function(error, results, fields){
            
            if(error == null) {

                var new_results = []
                var nombreResults = results.length - 1

                for (let i = 0; i < results.length; i++) {

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

                            results[i].commentsList = comments
                            new_results.push(results[i])

                            if(i == nombreResults){
                                res.status(200).json(new_results)
                            }
                        }
                    )
                }

            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
            
        }
    )

}

exports.recoverOne = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId

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
            
            if(error == null && results[0] !== undefined) {
                
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

                        if(error == null) {

                            results[0].commentsList = comments
                            res.status(200).json(results)

                        } else {

                            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                        }
                        
                    }
                )
                
            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }

        }
    )
}

exports.like = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId

    db.query(`
        SELECT COUNT(userId) AS exist 
        FROM likes
        WHERE postId = ?
        AND userId = ?`, 
        [postId, userId],

        function(error, results, fields){

            if(results[0].exist == 1){

                db.query(`DELETE FROM likes
                    WHERE postId = ? AND userId = ?`,
                    [postId, userId],

                    function(error, results, fields){
                        
                        if(error == null) {
                            
                            res.status(200).json({likes: 0, message: "Votre appréciation pour cette publication à révoquée"})

                        } else {
                            
                            res.status(500).json({likes: 1, message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                        }
                        
                    }
                )  

            } else {

                db.query(`INSERT INTO likes
                    VALUES(?, ?, NOW())`,
                    [postId, userId],

                    function(error, results, fields){
                        
                        if(error == null) {

                            res.status(201).json({likes: 1, message: "Votre appréciation pour cette publication à enrengistrée"})

                        } else {
                            
                            res.status(500).json({likes: 0, message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                        }
                        
                    }
                )  
            }
        }
    )
}

exports.comment = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId
    const reaction = req.body.reaction

    db.query(`
        INSERT INTO comments (id, postId, userId, reaction, dateComments)
        VALUES(NULL, ?, ?, ?, NOW())`,
        [postId, userId, reaction],

        function(error, results, fields){
            
            if(error == null) {
                
                res.status(201).json({message: "Votre commentaire à été publié"})

            } else {
                
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
            
        }
    )  

}

exports.deleteComments = (req, res, next) => {

    const userId = req.body.userId
    const commentsId = req.body.commentsId
    
    db.query(`
        SELECT privilege FROM user
        WHERE userId = ?`, 
        [userId],
        function(error, results, fields) {

            if(error == null) {

                if(parseInt(results[0].privilege) == 1){
                    
                    db.query(`
                        DELETE FROM comments 
                        WHERE userId=? AND id=?
                        `,
                        [userId, commentsId],
                        function(error, results, fields){

                            if(error == null){
                                
                                res.status(200).json({message: "Votre commentaire à été supprimée"})

                            } else {

                                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                            }

                        }
                    )

                } else if (parseInt(results[0].privilege) == 2){

                    db.query(`
                        DELETE FROM comments
                        WHERE id=?`,
                        [commentsId],
                        function(error, results, fields){

                        if(error == null){

                            res.status(200).json({message: "ADMIN | Le commentaire a été supprimé"})

                        } else {

                            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                        }

                    }
                    )

                }
                


            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }

        }
    )


    /*
    SELECT privilege FROM groupomania.user
WHERE userid = "12665000-d4bb-11eb-94dd-118ccc39a207";
*/

}
