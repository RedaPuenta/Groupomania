const express = require("express")
const router = express.Router()

const user = require("../middlewares/user")
const auth = require("../middlewares/auth")

router.post("/recover", auth, user)

module.exports = router