/*** ACCOUNT ***/ 

//! Requête qui permet de créer un utilisateur
//-INSERT --> email, password, firstName, lastName, userId, avatar, bio
exports.register = function(email, password, firstName, lastName, userId, avatar, bio){
    return `
    INSERT INTO user (email, password, firstName, lastName, userId, avatar, bio, privilege, dateCreation, firstConnection) 
    VALUES("${email}", "${password}", "${firstName}", "${lastName}", "${userId}", "${avatar}", "${bio}", DEFAULT, NOW(), DEFAULT)`
}

//! Requête qui permet récupèrer des infos sur un utilisateur (PAGE LOGIN)
//-SELECT --> userId, firstConnection, password
//~WITH --> email
exports.login = function(email){
    return `
    SELECT userId, firstConnection, password FROM user 
    WHERE email = "${email}"`
}

//! Requête qui permet de savoir un email existe déjà
//-SELECT --> COUNT(email)
//~WITH --> email
exports.emailUse = function(email){
    return`
    SELECT COUNT(email) AS exist FROM user 
    WHERE email = "${email}"`
}

/*** USER ***/ 

//! Requête qui permet récupèrer des infos sur un utilisateur (NAVBAR ET PAGE INFO)
//-SELECT --> firstName, lastName, bio, avatar, userId
//~WITH --> userId
exports.recoverForInfo = function(userId){
    return`
    SELECT firstName, lastName, bio, avatar, userId FROM user
    WHERE userId = "${userId}"`
}

//! Requête qui permet récupèrer des infos sur un utilisateur (PAGE FRIENDS)
//-SELECT --> firstName, lastName, bio, avatar, userId, privilege + nombre de contenu "agora" et "multimedia"
//~WITH --> userId
exports.recoverForFriends = function(userId){
    return`
    SELECT req1.*, COUNT(forum.postId) As forum FROM (
        SELECT user.avatar, user.bio, user.firstName, user.lastName, user.userId, user.privilege, COUNT(multimedia.postId) AS multimedia
        FROM user
        LEFT JOIN multimedia
        ON multimedia.userId = user.userId
        GROUP BY user.userId
    ) AS req1
    LEFT JOIN forum
    ON forum.userId = req1.userId
    WHERE req1.userId != "${userId}" AND req1.privilege != 2
    GROUP BY req1.userId`
}

//! Requête qui permet récupèrer des infos sur un utilisateur (PAGE PROFIL)
//-SELECT --> firstName, lastName, bio, avatar, userId, dateCreation, privilege + nombre de contenu "agora" et "multimedia" + nombre de "like" et de "commentaire" 
//~WITH --> userId
exports.recoverForProfil = function(userId){
    return `
    SELECT req3.*, COUNT(comments.userId) AS likes FROM (
        SELECT req2.*, COUNT(likes.userId) AS comments FROM (
            SELECT req1.*, COUNT(forum.postId) As forum FROM (
                SELECT user.avatar, user.bio, user.dateCreation, user.firstName, user.lastName, user.userId, user.privilege, COUNT(multimedia.postId) AS multimedia
                FROM user
                LEFT JOIN multimedia
                ON multimedia.userId = user.userId
                GROUP BY user.userId
            ) AS req1
            LEFT JOIN forum
            ON forum.userId = req1.userId
            WHERE req1.userId = "${userId}"
        ) AS req2
        LEFT JOIN likes
        ON likes.userId = req2.userId
    ) AS req3
    LEFT JOIN comments
    ON comments.userId = req3.userId`
}

//! Requête qui permet de modifier des informations sur un utilisateur
//-UPDATE --> avatar, bio, firstName, lastName, firstConnection, userId
exports.updateUser = function(avatar, bio, firstName, lastName, firstConnection, userId){
    return `
    UPDATE user SET 
    avatar = "${avatar}",
    bio = "${bio}",
    firstName = "${firstName}",
    lastName = "${lastName}",
    firstConnection = "${firstConnection}"
    WHERE userId = "${userId}"`
}

//! Requête qui permet de supprimer un utilisateur
//-DELETE
//~WITH --> userId
exports.deleteUser = function(userId){
    return `
    DELETE FROM user 
    WHERE userId = "${userId}"`
}

//! Requête qui permet tout les noms de fichier qui ont été créés par un utilisateur
//-SELECT --> media
//~WITH --> userId
exports.selectCurrentFileUser = function(userId){
    return `
    SELECT media FROM multimedia
    WHERE userId = "${userId}"`
}

/*** AGORA ET MULTIMEDIA ***/ 

//! Requête qui permet de récupérer de mulitples informations sur une publication
//-SELECT --> postId, userId, avatar, firstName, lastName, legend, media, likes, comments, my_post, my_like, my_comments, datePost
//~WITH --> userId
exports.recoverAllPost = function(userId, type){
    return `
    SELECT req5.*, COUNT(${type}.userId) AS my_post FROM (
        SELECT req4.*, COUNT(comments.userId) AS my_comments FROM (
            SELECT req3.*, COUNT(likes.userId) AS my_like FROM (
                    SELECT req2.*, user.firstName, SUBSTRING(user.lastName, 1, 1) AS lastName, user.avatar FROM (
                        SELECT req1.*, COUNT(likes.dateLikes) AS likes FROM (
                            SELECT ${type}.*, COUNT(comments.dateComments) AS comments
                            FROM comments
                            RIGHT JOIN ${type}
                            ON ${type}.postId = comments.postId
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
                AND likes.userId = "${userId}"
                GROUP BY req3.postId
            ) AS req4
            LEFT JOIN comments
            ON req4.postId = comments.postId
            AND comments.userId = "${userId}"
            GROUP BY req4.postId
            ORDER BY req4.datePost DESC
    ) AS req5
    LEFT JOIN ${type}
    ON ${type}.userId = req5.userId 
    AND ${type}.userId = "${userId}"
    GROUP BY req5.postId`
}

//! Requête qui permet de récupérer de multiples informations sur un commentaire
//-SELECT --> commentsId, userId, avatar, firstName, lastName, reaction, my_comments, dateComments
//~WITH --> userId, postId
exports.commentsList = function(userId, postId, limit){
    
    if(limit == "none"){
        var limitCalc = ``
    } else {
        var limitCalc = `LIMIT ${limit}`
    }
    
    return `
    SELECT req1.*,  COUNT(user.userId) AS my_comments FROM (
        SELECT user.avatar, user.firstName, user.userId, SUBSTRING(user.lastName, 1, 1) AS lastName, comments.id AS commentsId, comments.reaction, comments.dateComments 
        FROM comments
        LEFT JOIN user
        ON user.userId = comments.userId 
        WHERE comments.postId = "${postId}"
    ${limitCalc}) AS req1
    LEFT JOIN user
    ON user.userId = req1.userId AND user.userId = "${userId}"
    GROUP BY req1.commentsId
    ORDER BY req1.dateComments ASC`
}

//! Requête qui permet de créer une publication Agora
//-INSERT --> userId, postId, titre, datePost
exports.newPostAgora = function(userId, postId, titre){
    return `
    INSERT INTO forum (userId, postId, titre, datePost) 
    VALUES("${userId}", "${postId}", "${titre}", NOW())`
}

//! Requête qui permet de créer une publication Multimédia
//-INSERT --> userId, postId, media, legend, datePost
exports.newPostMultimedia = function(userId, postId, media, legend){
    return`
    INSERT INTO multimedia (userId, postId, media, legend, datePost) 
    VALUES("${userId}", "${postId}", "${media}", "${legend}", NOW())`
}

//! Requête qui permet de supprimer n"importe quelle publication
//-DELETE
//~WITH --> postId
exports.deletePost = function(postId, type){
    return `
    DELETE FROM ${type}
    WHERE postId = "${postId}"`
}

//! Requête qui permet le nom du fichier associé à une publication
//-SELECT --> media
//~WITH --> postId
exports.selectCurrentFilePost = function(postId){
    return `
    SELECT media FROM multimedia
    WHERE postId = "${postId}"`
}

/*** ACTION ***/ 

//! Requête qui permet de savoir si un utilisateur a liké ou disliké une publication
//-SELECT --> COUNT(likes)
//~WITH --> postId, userId
exports.likesOrDislikes = function(postId, userId){
    return`
    SELECT COUNT(userId) AS exist 
    FROM likes
    WHERE postId = "${postId}"
    AND userId = "${userId}"`
}

//! Requête qui permet de liké une publication
//-INSERT --> postId, userId, dateLikes
exports.likes = function(postId, userId){
    return `
    INSERT INTO likes (postId, userId, dateLikes)
    VALUES("${postId}", "${userId}", NOW())`
}

//! Requête qui permet de disliké une publication
//-DELETE
//~WITH --> postId, userId
exports.dislikes = function(postId, userId){
    return `
    DELETE FROM likes
    WHERE postId = "${postId}" AND userId = "${userId}"`
}

//! Requête qui permet de créer un commentaire
//-INSERT --> postId, userId, reaction, dateComments
exports.newComments = function(postId, userId, reaction){
    return`
    INSERT INTO comments (id, postId, userId, reaction, dateComments)
    VALUES(NULL, "${postId}", "${userId}", "${reaction}", NOW())`
}

//! Requête qui permet de supprimer un commentaire
//-DELETE
//~WITH --> id
exports.deleteComments = function(id){
    return `
    DELETE FROM comments 
    WHERE id = "${id}"`
}

/*** ASSET ***/ 

//! Requête qui permet de récupérer tout les avatars du site
//-SELECT --> *
exports.avatarList = function(){
    return`
    SELECT * FROM list_avatar
    ORDER BY avatar ASC`
}

/*** SECUTITE ***/ 

//! Requête qui permet de connaître le privilège d"un utilisateur
//-SELECT --> privilege
//~WITH --> userId
exports.privilegeUser = function(userId){
    return `SELECT privilege FROM user WHERE userId = "${userId}"`
}

//! Requête qui permet de connaître le propriétaire d"une publication
//-SELECT --> userId
//~WITH --> postId
exports.selectAuthPost = function(postId){

    return `
    SELECT userId FROM multimedia
    WHERE postId = "${postId}"
    UNION
    SELECT userId FROM forum
    WHERE postId = "${postId}"`

}

//! Requête qui permet de connaître le propriétaire d'un commentaire
//-SELECT --> userId
//~WITH --> id
exports.selectAuthComments = function(id){
    return `
    SELECT userId FROM comments
    WHERE id = "${id}"`
}