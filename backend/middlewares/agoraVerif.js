//! Middleware qui permet de vérifier si un titre de post est valide
module.exports = (req, res, next) => {
    
    const field = req.body.titre
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    if(field == ""  || !/[a-z]/.test(field)){
        
        res.status(400).json({message: "Vous avez oublié de renseigner un titre"})

    } else if (regexAntiInjection.test(field)) {
        
        res.status(400).json({message: "Certains caractères contenu dans votre titre ne sont pas acceptables"})
    
    } else {

        next()
    }
    
}