//! Middleware qui vérifie si la bio, le nom et le prénom sont correctes
module.exports = (req, res, next) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const bio = req.body.bio
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    if(firstName == "" || !/[a-zA-Z]/.test(firstName)){

        res.status(400).json({message: "Vous avez oublié de renseigner votre prénom"})

    } else if (lastName == "" || !/[a-zA-Z]/.test(lastName)) {

        res.status(400).json({message: "Vous avez oublié de renseigner votre nom"})

    } else if (bio == "" || !/[a-zA-Z]/.test(bio)) {

        res.status(400).json({message: "Vous avez oublié de renseigner votre biographie"})

    } else if (regexAntiInjection.test(firstName)) {

        res.status(400).json({message: "Certains caractères contenu dans votre prénom ne sont pas acceptables"})

    } else if (regexAntiInjection.test(lastName)) {

        res.status(400).json({message: "Certains caractères contenu dans votre nom ne sont pas acceptables"})

    } else if (regexAntiInjection.test(bio)) {

        res.status(400).json({message: "Certains caractères contenu dans votre biographie ne sont pas acceptables"})

    } else if (bio.length > 150) {

        res.status(400).json({message: "Votre biographie est trop longue (max 150 caractères)"})

    } else {
      
        next()
    }
    
}