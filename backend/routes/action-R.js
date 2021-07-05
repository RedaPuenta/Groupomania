const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const actionController = require("../controllers/action-C")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")
//! Middleware qui permet de vérifier si un commentaire de post est valide
const commentsVerif = require("../middlewares/commentsVerif")

//! Routes qui permet d'ajouter ou de révoquer un like (USER)
router.post("/like", auth, actionController.like)
//! Routes qui permet de créer un commentaire (USER)
router.post("/", auth, commentsVerif, actionController.comment)
//! Routes qui permet de supprimer un commentaire (USER + ADMIN)
router.delete("/:commentsIdVerif", auth, actionController.deleteComments)

module.exports = router