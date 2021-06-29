const db = require("../mysql/connectDB")

module.exports = (req, res, next)  => {
    db.query(`
        SELECT COUNT(post.postId) As forum, user_media.multimedia, user_media.firstName, user_media.lastName, user_media.avatar, user_media.bio, user_media.dateCreation FROM (
            SELECT COUNT(post.postId) AS multimedia, user.userId, user.firstName, user.lastName, user.avatar, user.bio, user.dateCreation 
            FROM user
            LEFT JOIN post
            ON post.userId = user.userId AND post.type = "media"
            GROUP BY user.userId
        ) AS user_media
        LEFT JOIN post
        ON post.userId = user_media.userId AND post.type = "agora"
        GROUP BY user_media.userId;`, 
        function(error, results, fields){

            if(error == null) {

                res.status(200).json(results)

            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
        })
    
    
}