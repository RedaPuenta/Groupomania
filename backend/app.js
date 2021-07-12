require('dotenv').config()
const express = require("express")
const app = express()
const path = require("path")
const helmet = require("helmet")
const logger = require("./monitoring/config/logger")
const accountRoutes = require("./routes/account-R")
const multimediaRoutes = require("./routes/multimedia-R")
const agoraRoutes = require("./routes/agora-R")
const actionRoutes = require("./routes/action-R")
const userRoutes = require("./routes/user-R")
const assetRoutes = require("./routes/asset-R")

//! Ici, on définie des en-têtes de sécurité pour chaque requête (11/15)
app.use(helmet())

//! Ici, on définie les en-têtes des requêtes qui sont nécessaires au fonctionnement de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

//! Ici, on "parse" automatiquement le corps des requêtes pour les formats "application/x-www-form-urlencoded"
app.use(express.urlencoded({extended: true}))
//! Ici, on "parse" automatiquement le corps des requêtes pour les formats "application/json"
app.use(express.json())

//! On utilise le logger qui capture et écrit les logs pour chaque requêtes
app.use(logger)

//! Ici, on contruit les chemins de l'application Express avec les routes associées
app.use('/media', express.static(path.join(__dirname, 'media')))
app.use("/api/account", accountRoutes)
app.use("/api/multimedia", multimediaRoutes)
app.use("/api/agora", agoraRoutes)
app.use("/api/action", actionRoutes)
app.use("/api/user", userRoutes)
app.use("/api/asset", assetRoutes)

module.exports = app