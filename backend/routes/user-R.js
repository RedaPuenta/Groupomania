const express = require("express")
const router = express.Router()

const userController = require("../controllers/user-C")
const infoVerif = require("../middlewares/infoVerif")
const auth = require("../middlewares/auth")

router.get("/info/:id", auth, userController.info)
router.get("/friends/:id", auth, userController.friends)
router.get("/profil/:id", auth, userController.profil)
router.put("/:id", auth, infoVerif, userController.updateUser)
router.delete("/:id", auth, userController.deleteUser)


module.exports = router