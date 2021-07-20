const regex = require("../regex/regex")

//! Middleware qui permet de vérifier si un email est valide
module.exports = (req, res, next) => {

    //* On récupère l'email de l'utilisateur dans  le corps de la requête
    const emailReq = req.body.email
    //* On déclare notre Regex qui vérifié si un email est valide
    const regexEmail = regex.email()

    //* Si l'email de l'utilisateur est en concordance avec le regex ...
    if(emailReq.match(regexEmail)) {

        //* On passe à la suite
        next()
    
    //* Sinon, si l'email de l'utilisateur n'est pas en concordance avec le regex ...
    } else {

        //* On envoie réponse d'échec
        res.status(400).json({message: "L'email ne semble pas valide"})
        
    }

}

