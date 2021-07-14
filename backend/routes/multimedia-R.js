const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const multimediaController = require("../controllers/multimedia-C")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")
//! Middleware qui permet de télécharger des fichiers
const uploadMedia = require("../middlewares/uploadMedia")
//! Middleware qui permet de vérifier si une publication (Multimédia) est valide
const multimediaVerif = require("../middlewares/multimediaVerif")

//! Routes qui permet de récupérer plusieurs contenus multimédia (USER)
router.post("/recoverAll", auth, multimediaController.recover)
//! Routes qui permet de récupérer un seule contenu multimédia (USER)
router.post("/recoverOne", auth, multimediaController.recoverOne)
//! Routes qui permet de créer un contenu  multimédia (USER)
router.post("/post", auth, uploadMedia, multimediaVerif, multimediaController.post)
//! Fonction qui permet de supprimer un contenu multimédia (USER + ADMIN)
router.delete("/post/:postIdVerif", auth, multimediaController.deletePost)

module.exports = router