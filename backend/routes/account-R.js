const express = require("express")
const router = express.Router()

//! Controlleur qui contient toutes les fonctions finales pour la route
const userController = require("../controllers/account-C")
//! Middleware qui permet de vérifier si un mot de passe est fort
const passwordValid = require("../middlewares/passwordValid")
//! Middleware qui permet de vérifier si un email est valide
const emailValid = require("../middlewares/emailValid")
//! Middleware qui permet de vérifier si un nom ou un prénom est valide
const nameVerif = require("../middlewares/nameVerif")
//! Middleware qui permet de savoir un email est déjà associé à un utilisateur lors de la connexion
const emailUseLogin = require("../middlewares/emailUseLogin")
//! Middleware qui permet de savoir un email est déjà utilisé lors de l'inscription
const emailUseSignUp = require("../middlewares/emailUseSignUp")

//! Routes qui permet de créer un compte (ALL)
router.post("/signup", nameVerif, emailUseSignUp, emailValid, passwordValid, userController.signup)
//! Routes qui permet de se connecter (ALL)
router.post("/login", emailUseLogin, userController.login)
//! Routes qui permet de bloquer l'accès au site sans connexion préalable (USER)
router.get("/:id", userController.access)

module.exports = router