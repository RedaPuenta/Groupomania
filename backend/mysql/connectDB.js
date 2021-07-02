require("dotenv").config()
const mysql = require('mysql2')

//! Fonction qui permet de s'authentifier à la base de donnée
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

//! Fonction qui permet de se connecter à la base de donnée
db.connect((error)=> {
    if(error){
        console.log("Connexion échouée à MySQL --> " + error)
    } else {
        console.log("Connexion réussi à MySQL")
    }
})

module.exports = db;