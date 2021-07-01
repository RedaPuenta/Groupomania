const db = require("../mysql/connectDB")
const fs = require("fs")

exports.info = (req, res, next) => {
    
    const userId = req.params.id

    db.query(`
        SELECT firstName, lastName, bio, avatar FROM user
        WHERE userId = ?`,
        [userId],
        function(error, results, fields) {

            if(error == null) {

                res.status(200).json(results)

            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
        }
    )

}

exports.friends = (req, res, next)  => {

    const userId = req.params.id
    
    db.query(`
        SELECT COUNT(post.postId) As forum, user_media.userId, user_media.multimedia, user_media.firstName, user_media.lastName, user_media.avatar, user_media.bio, user_media.dateCreation FROM (
            SELECT COUNT(post.postId) AS multimedia, user.userId, user.firstName, user.lastName, user.avatar, user.bio, user.dateCreation 
            FROM user
            LEFT JOIN post
            ON post.userId = user.userId AND post.type = "media"
            GROUP BY user.userId
        ) AS user_media
        LEFT JOIN post
        ON post.userId = user_media.userId AND post.type = "agora"
        WHERE user_media.userId != ?
        GROUP BY user_media.userId`, 
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

exports.profil = (req, res, next)  => {

    const userId = req.params.id
    
    db.query(`
        SELECT COUNT(comments.userId) AS likes, score_comments.* FROM (
            SELECT COUNT(likes.userId) AS comments, score_likes.* FROM (
                SELECT COUNT(post.postId) As forum, user_media.multimedia,  user_media.userId, user_media.firstName, user_media.lastName, user_media.avatar, user_media.bio, user_media.dateCreation FROM (
                    SELECT COUNT(post.postId) AS multimedia, user.userId, user.firstName, user.lastName, user.avatar, user.bio, user.dateCreation 
                    FROM user
                    LEFT JOIN post
                    ON post.userId = user.userId AND post.type = "media"
                    GROUP BY user.userId
                ) AS user_media
                LEFT JOIN post
                ON post.userId = user_media.userId AND post.type = "agora"
                WHERE user_media.userId = ?
            ) AS score_likes
            LEFT JOIN likes
            ON likes.userId = score_likes.userId
            ) AS score_comments
            LEFT JOIN comments
            ON comments.userId = score_comments.userId`, 
        [userId],
        function(error, results, fields){

            if(error == null) {

                let pts_likes = 14
                let pts_comments = 11
                let pts_multimedia = 17
                let pts_forum = 21

                let score_reaction = (parseInt(results[0].likes) * pts_likes) + (parseInt(results[0].comments) * pts_comments)
                let score_participation = (parseInt(results[0].multimedia) * pts_multimedia) + (parseInt(results[0].forum) * pts_forum)

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

            } else {

                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
        }
    )
    
}

exports.updateUser = (req, res, next) => {

    const avatar = req.body.avatar
    const bio = req.body.bio
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.params.id
    
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
            
            if(error == null) {

                res.status(200).json(results)

            } else {
                
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }

        }
    )
}

exports.deleteUser = (req, res, next) => {

    const userId = req.params.id

    db.query(`
        SELECT media FROM post
        WHERE userId = ?`, 
        [userId],
        function(error, results, fields){

            if(error == null){
                
                const mediaUrl = results
                    
                db.query(`
                    DELETE FROM user 
                    WHERE userId = ?
                    `,
                    [userId],
                    function(error, results, fields) {
                        
                        if(error == null) {

                            for (let i = 0; i < mediaUrl.length; i++) {
                                
                                fs.unlink(`media/${mediaUrl[i].media}`, (err) => {
                                    if (err) throw err
                                })
                                
                            }

                            res.status(200).json({message: "Votre compte à été supprimée"})

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
    /*
    
    */
}