const express = require("express")
const router = express.Router()

const postController = require("../controllers/post-C")
const auth = require("../middlewares/auth")
const uploadMedia = require("../middlewares/uploadMedia")
const postVerif = require("../middlewares/postVerif")

router.post("/", auth, uploadMedia, postVerif, postController.create)
router.post("/recover", auth, postController.recover)
router.post("/like", auth, postController.like)

// On exporte router EXPRESS pour que l'application EXPRESS puisse s'en servir
module.exports = router