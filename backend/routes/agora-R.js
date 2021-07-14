const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const agoraController = require("../controllers/agora-C")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")
//! Middleware qui permet de vérifier si une publication (Agora) est valide
const agoraVerif = require("../middlewares/agoraVerif")

//! Routes qui permet de récupérer plusieurs contenus agora (USER)
router.post("/recoverAll", auth, agoraController.recover)
//! Routes qui permet de récupérer un seule contenu agora (USER)
router.post("/recoverOne", auth, agoraController.recoverOne)
//! Routes qui permet de créer un contenu agora (USER)
router.post("/post", auth, agoraVerif, agoraController.post)
//! Fonction qui permet de supprimer un contenu agora (USER + ADMIN)
router.delete("/post/:postIdVerif", auth, agoraController.deletePost)

module.exports = router