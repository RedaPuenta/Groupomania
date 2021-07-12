const appRootPath = require("app-root-path")
const morgan = require("morgan")
const fs = require("fs")

//* On exporte la configuration qui écrit des logs pour chaque requêtes
module.exports = morgan((morganStyle, req, res) => {
    
    //* Ici, on définie des informations relatives au temps
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let secondes = date.getSeconds()
    let msecondes = date.getMilliseconds()

    //* Ici, on définie un type de log général (base)
    let log = `Le ${day}/${month}/${year} à ${hours}:${minutes}:${secondes}:${msecondes} [${req.ip}] [${req.method}] ${req.protocol}://${req.get('host')}${req.originalUrl} [${res.statusCode}-${res.statusMessage}]`
    //* Ici, on définie deux types de log spécifique (base + information complémentaire)
    let logWithBody = log + ` [${JSON.stringify(req.body)}]`

    //* SI le code de statut de la requête est supérieur ou égal à 500 ...
    if(parseInt(res.statusCode) >= 500){

        //* On écrit un log (base) dans le fichier "error_serveur.log"
        fs.appendFile(`${appRootPath}/monitoring/logs/error_serveur.log`, log + "\n", (error) => {
            if (error) console.log(error)
        })

    //* SINON SI la méthode de la requête est différente de "OPTIONS" et que le code de statut de la requête est strictement inférieur à 400 ...
    } else if (req.method !== "OPTIONS" && parseInt(res.statusCode) >= 400){

        //* On écrit un log spécifique (avec le corps) dans le fichier "suspicious_activity.log"
        fs.appendFile(`${appRootPath}/monitoring/logs/suspicious_activity.log`, logWithBody + "\n", (error) => {
            if (error) console.log(error)
        })
        
    }
 
})