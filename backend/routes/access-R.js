const express = require("express")
const router = express.Router()

const access = require("../middlewares/access")

router.post("/", access)

module.exports = router