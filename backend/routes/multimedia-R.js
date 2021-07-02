const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const multimediaController = require("../controllers/multimedia-C")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")
//! Middleware qui permet de télécharger des fichiers
const uploadMedia = require("../middlewares/uploadMedia")
//! Middleware qui permet de vérifier si une légende de post est valide
const postVerif = require("../middlewares/postVerif")
//! Middleware qui permet de vérifier si un commentaire de post est valide
const commentsVerif = require("../middlewares/commentsVerif")

//! Routes qui permet de récupérer plusieurs contenus multimédia (USER)
router.post("/recoverAll", auth, multimediaController.recover)
//! Routes qui permet de récupérer un seule contenu multimédia (USER)
router.post("/recoverOne", auth, multimediaController.recoverOne)
//! Routes qui permet de créer un contenu (USER)
router.post("/post", auth, uploadMedia, postVerif, multimediaController.post)
//! Fonction qui permet de supprimer un post (USER + ADMIN)
router.delete("/post/:postIdVerif", auth, multimediaController.deletePost)
//! Routes qui permet d'ajouter ou de révoquer un like (USER)
router.post("/like", auth, multimediaController.like)
//! Routes qui permet de créer un commentaire (USER)
router.post("/comment", auth, commentsVerif, multimediaController.comment)
//! Routes qui permet de supprimer un commentaire (USER + ADMIN)
router.delete("/comments/:commentsIdVerif", auth, multimediaController.deleteComments)

module.exports = router