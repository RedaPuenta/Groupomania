const regex = require("../regex/regex")

//! Middleware qui permet de vérifier si un commentaire de post est valide
module.exports = (req, res, next) => {

    //* On transforme les doubles guillemets par des guillemets simples (si il y en a)
    req.body.reaction = regex.revokeQuote(req.body.reaction)

    //* On récupère le commentaire contenu dans le corps de la requête
    const field = req.body.reaction
    
    //* On déclare le regex "ANTI-INJECTION"
    const regexAntiInjection = regex.antiInjection()

    //* On configure un tableau contenant tout les conditions à vérifier et leur réponse
    const cas = [
        {condition: field == "" || !/[a-zA-Z]/.test(field), réponse: "Vous avez oublié de renseigner un commentaire"},
        {condition: regexAntiInjection.test(field), réponse: "Certains caractères contenu dans votre commentaires ne sont pas acceptables"}
    ]

    //* On configure un système de point
    const valid = cas.length
    var points = 0
    
    //* Pour chaque conditions ...
    for (let i = 0; i < cas.length; i++) {
        
        //* Si la condition n'est pas respecter ...
        if(cas[i].condition){

            //* On envoie une réponse d'échec personnalisée
            res.status(400).json({message: cas[i].réponse})
            break
        
        //* Si tout est correct, on ajoute 1 point
        } else {
            points++
        }
        
    }

    //* Si les points correpondent à la taille du tableau des conditions à vérifier ...
    if(valid == points) {

        //* On passe à la suite
        next()

    }
    
}