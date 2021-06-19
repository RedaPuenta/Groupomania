require('dotenv').config()

const express = require("express")
const app = express()
const path = require("path")
const helmet = require("helmet")

const userRoutes = require("./routes/user-R")
const postRoutes = require("./routes/post-R")
const accessRoutes = require("./routes/access-R")

app.use(helmet())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/media', express.static(path.join(__dirname, 'media')))
app.use("/api/auth", userRoutes)
app.use("/api/publication", postRoutes)
app.use("/api/access", accessRoutes)

module.exports = app