const idGenerator = require ("uuid")
const db = require("../mysql/connectDB")

exports.create = (req, res, next) => {

    const userId = req.body.userId
    const postId = idGenerator.v1()
    const media = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`
    const legend = req.body.legend

    db.query(`INSERT INTO post (userId, postId, media, legend, datePost) 
        VALUES(?, ?, ?, ?, NOW())`, 
        [userId, postId, media, legend], 

        function(error, results, fields){

            if(results.affectedRows == 1){

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

    db.query(`SELECT post_comments_likes_mylikes.*, COUNT(likes.userId) AS my_like FROM (
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
            ORDER BY datePost DESC
        ) AS post_comments_likes_mylikes
        LEFT JOIN likes
        ON post_comments_likes_mylikes.post = likes.postId 
        AND likes.userId = ?
        GROUP BY post_comments_likes_mylikes.post`, 
        [userId],
        
        function(error, results, fields){

            if(error == null) {

                res.status(200).json(results)

            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
            
        }
    )

}

exports.like = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId

    db.query(`SELECT COUNT(userId) AS exist 
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