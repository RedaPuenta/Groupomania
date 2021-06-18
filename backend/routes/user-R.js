const express = require("express")
const router = express.Router()

const userController = require("../controllers/users-C")
const emailUse = require('../middlewares/emailUse')
const passwordValid = require("../middlewares/passwordValid")
const emailValid = require("../middlewares/emailValid")
const nameVerif = require("../middlewares/nameVerif")

router.post("/signup", nameVerif, emailUse.signup, emailValid, passwordValid, userController.signup)
router.post("/login", emailUse.login, userController.login)

// On exporte router EXPRESS pour que l'application EXPRESS puisse s'en servir
module.exports = router