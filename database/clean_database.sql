-- ! Code à éxécuter à partir de l'utilisateur @ROOT

USE groupomania;

ALTER TABLE comments
DROP FOREIGN KEY fk_user_comments;

ALTER TABLE likes
DROP FOREIGN KEY fk_user_likes;

TRUNCATE TABLE comments;
TRUNCATE TABLE likes;
TRUNCATE TABLE forum;
TRUNCATE TABLE multimedia;
TRUNCATE TABLE user;

ALTER TABLE comments
ADD CONSTRAINT fk_user_comments FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE likes
ADD CONSTRAINT fk_user_likes FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE ON UPDATE NO ACTION;
