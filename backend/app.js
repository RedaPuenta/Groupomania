require('dotenv').config()

const express = require("express")
const app = express()

const helmet = require("helmet")
const userRoutes = require("./routes/user-R")

app.use(helmet())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/auth", userRoutes)

module.exports = app