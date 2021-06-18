require("dotenv").config()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

db.connect((error)=> {
    if(error){
        console.log("Connexion échouée à MySQL --> " + error)
    } else {
        console.log("Connexion réussi à MySQL")
    }
})

module.exports = db;