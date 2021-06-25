const express = require("express")
const router = express.Router()

const multimediaController = require("../controllers/multimedia-C")
const auth = require("../middlewares/auth")
const uploadMedia = require("../middlewares/uploadMedia")
const postVerif = require("../middlewares/postVerif")
const commentsVerif = require("../middlewares/commentsVerif")

router.post("/create", auth, uploadMedia, postVerif, multimediaController.create)
router.post("/recover", auth, multimediaController.recover)
router.post("/recoverOne", auth, multimediaController.recoverOne)
router.post("/like", auth, multimediaController.like)
router.post("/comment", auth, commentsVerif, multimediaController.comment)
router.post("/deleteComment", auth, multimediaController.deleteComments)

// On exporte router EXPRESS pour que l'application EXPRESS puisse s'en servir
module.exports = router