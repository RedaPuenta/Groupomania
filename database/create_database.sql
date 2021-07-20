-- ! Code à éxécuter à partir de l'utilisateur @ROOT

-- * On créer un utilisateur et on lui donne les privilèges nécessaires
CREATE USER 'groupomania'@'localhost' IDENTIFIED BY 'groupo913!';
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania'@'localhost';

-- * On créer la base de donnée $groupomania
CREATE DATABASE groupomania CHARACTER SET 'utf8mb4';
USE groupomania;

-- * On créer une table #avatar
CREATE TABLE list_avatar (
  avatar varchar(200) NOT NULL,
  PRIMARY KEY (avatar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On insert dans la table #avatar tout les avatars du site (pack d'avatar)
LOCK TABLES list_avatar WRITE;
INSERT INTO list_avatar VALUES ('128_1.png'),('128_10.png'),('128_11.png'),('128_12.png'),('128_13.png'),('128_14.png'),('128_15.png'),('128_16.png'),('128_2.png'),('128_3.png'),('128_4.png'),('128_5.png'),('128_6.png'),('128_7.png'),('128_8.png'),('128_9.png');
UNLOCK TABLES;

-- * On créer une table #user
CREATE TABLE user (
    userId VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    avatar VARCHAR(50) NOT NULL,
    bio VARCHAR(200) NOT NULL,
    privilege TINYINT UNSIGNED NOT NULL DEFAULT 1,
    firstConnection BOOLEAN NOT NULL DEFAULT 0,
    dateCreation DATETIME NOT NULL,
    PRIMARY KEY(userId)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On créer une table #multimedia
CREATE TABLE multimedia (
    postId VARCHAR(100) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    media TINYTEXT NOT NULL,
    legend VARCHAR(200) NOT NULL,
    datePost DATETIME NOT NULL,
    PRIMARY KEY(postId)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On créer une table #forum (agora)
CREATE TABLE forum (
    postId VARCHAR(100) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    titre VARCHAR(200) NOT NULL,
    datePost DATETIME NOT NULL,
    PRIMARY KEY(postId)
)
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On créer une table #comments
-- - A NOTÉ : Cette table est utilisée par la table #multimedia et la table #forum
CREATE TABLE comments (
    id SMALLINT AUTO_INCREMENT NOT NULL,
    postId VARCHAR(100) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    reaction MEDIUMTEXT NOT NULL,
    dateComments DATETIME NOT NULL,
    PRIMARY KEY(id)
) 
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On créer une table #likes
-- - A NOTÉ : Cette table est utilisée par la table #multimedia et la table #forum 
CREATE TABLE likes (
    postId VARCHAR(100) NOT NULL,
    userId VARCHAR(100) NOT NULL,
    dateLikes DATETIME NOT NULL,
    PRIMARY KEY(postId, userId)
) 
ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

-- * On ajoute une clé étrangère sur la table #comments par rapport à la colonne "userId"
-- * Avec pour référence, la colonne "userId" de la tablel #user
-- - COMPORTEMENT : Si un utilisateur est supprimé, tout ces commentaires le seront aussi
ALTER TABLE comments
ADD CONSTRAINT fk_user_comments FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE NO ACTION;

-- * On ajoute une clé étrangère sur la table #likes par rapport à la colonne "userId"
-- * Avec pour référence, la colonne "userId" de la tablel #user
-- - COMPORTEMENT : Si un utilisateur est supprimé, tout ces likes le seront aussi
ALTER TABLE likes
ADD CONSTRAINT fk_user_likes FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE NO ACTION;

-- : PROBLEME = Ne pouvant pas créer de clé étrangère logique avec deux références différentes sur la colonne "postId" de #multimedia et #forum ... 
-- : CONSEQUENCE = J'ai décidé d'utilisé un "trigger" pour la table #multimedia et #forum ...

-- * On ajoute un "trigger" sur la table #forum (agora)
-- - COMPORTEMENT : Si une publication de type #forum (agora) est supprimé, tout ses commentaires et ses likes le seront aussi
DELIMITER |
CREATE TRIGGER before_delete_forum BEFORE DELETE
ON forum FOR EACH ROW
BEGIN
    DELETE FROM comments
    WHERE postId = OLD.postId;
    DELETE FROM likes
    WHERE postId = OLD.postId;
END |
DELIMITER ;

-- * On ajoute un "trigger" sur la table #multimedia
-- - COMPORTEMENT : Si une publication de type #multimedia est supprimé, tout ses commentaires et ses likes le seront aussi
DELIMITER |
CREATE TRIGGER before_delete_multimedia BEFORE DELETE
ON multimedia FOR EACH ROW
BEGIN
    DELETE FROM comments
    WHERE postId = OLD.postId;
    DELETE FROM likes
    WHERE postId = OLD.postId;
END |
DELIMITER ;

-- : PROBLEME = Comme l'action 'ON CASCADE' d'une clé étrangère n'est pas considérée comme un évenèment (DELETE) pour les "triggers" 
-- : CONSEQUENCE = J'ai décidé d'utilisé un "trigger" pour la table #user ...

-- * On ajoute un "trigger" sur la table #user
-- - COMPORTEMENT : Si un utilisateur est supprimé, tout ses publications de type #forum (Agora) et #multimedia (multimédia) le seront aussi
DELIMITER |
CREATE TRIGGER before_delete_user BEFORE DELETE
ON user FOR EACH ROW
BEGIN
    DELETE FROM forum
    WHERE userId = OLD.userId;
    DELETE FROM multimedia
    WHERE userId = OLD.userId;
END |
DELIMITER ;
