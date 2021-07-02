const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const userController = require("../controllers/user-C")
//! Middleware qui vérifie si la bio, le nom et le prénom sont correctes
const infoVerif = require("../middlewares/infoVerif")
//! Middleware qui vérifie le token et les autorisations
const auth = require("../middlewares/auth")

//! Route qui permet de récupérer toutes les informations relatives à la page "info" (ALL)
router.get("/info/:userId", auth, userController.info)
//! Route qui permet de récupérer toutes les informations relatives à la page "friends" (ALL)
router.get("/friends/:userId", auth, userController.friends)
//! Route qui permet de récupérer toutes les informations relatives à la page "profil" (ALL)
router.get("/profil/:userId", auth, userController.profil)
//! Route qui permet de modifier les informations d'un utilisateur (USER + ADMIN)
router.put("/:userIdVerif", auth, infoVerif, userController.updateUser)
//! Route qui permet de supprimé un utilisateur (USER + ADMIN)
router.delete("/:userIdVerif", auth, userController.deleteUser)

module.exports = router