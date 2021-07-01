const express = require("express")
const router = express.Router()

const assetController = require("../controllers/asset-C")
const auth = require("../middlewares/auth")

router.get("/avatar", auth, assetController.avatar)

module.exports = router