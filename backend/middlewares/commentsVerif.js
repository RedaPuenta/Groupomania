//! Middleware qui permet de vérifier si un commentaire de post est valide
module.exports = (req, res, next) => {

    const reaction = req.body.reaction
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    if(reaction == "" || !/[a-z]/.test(reaction)){
        
        res.status(400).json({message: "Vous avez oublié de renseigner un commentaire"})

    } else if (regexAntiInjection.test(reaction)) {

        res.status(400).json({message: "Certains caractères contenu dans votre commentaires ne sont pas acceptables"})
    
    }  else {
      
        next()
    }
    
}