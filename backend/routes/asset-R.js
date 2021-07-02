const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const assetController = require("../controllers/asset-C")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")

//! Routes qui permet de récupérer les avatars du sites (ALL)
router.get("/avatar", auth, assetController.avatar)

module.exports = router