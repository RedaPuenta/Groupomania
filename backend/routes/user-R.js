const express = require("express")
const router = express.Router()

const userController = require("../controllers/users-C")
const passwordValid = require("../middlewares/passwordValid")
const emailValid = require("../middlewares/emailValid")
const nameVerif = require("../middlewares/nameVerif")
const emailUseLogin = require("../middlewares/emailUseLogin")
const emailUseSignUp = require("../middlewares/emailUseSignUp")

router.post("/signup", nameVerif, emailUseSignUp, emailValid, passwordValid, userController.signup)
router.post("/login", emailUseLogin, userController.login)

// On exporte router EXPRESS pour que l'application EXPRESS puisse s'en servir
module.exports = router