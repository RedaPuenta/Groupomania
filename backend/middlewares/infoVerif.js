//! Middleware qui vérifie si la bio, le nom et le prénom sont correctes
module.exports = (req, res, next) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const bio = req.body.bio
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    if(firstName == "" || !/[a-z]/.test(firstName)){

        res.status(400).json({message: "Vous avez oublié de renseigner votre prénom"})

    } else if (lastName == "" || !/[a-z]/.test(lastName)) {

        res.status(400).json({message: "Vous avez oublié de renseigner votre nom"})

    } else if (bio == "" || !/[a-z]/.test(bio)) {

        res.status(400).json({message: "Vous avez oublié de renseigner votre biographie"})

    } else if (regexAntiInjection.test(firstName)) {

        res.status(400).json({message: "Certains caractères contenu dans votre prénom ne sont pas acceptables"})

    } else if (regexAntiInjection.test(lastName)) {

        res.status(400).json({message: "Certains caractères contenu dans votre nom ne sont pas acceptables"})

    } else if (regexAntiInjection.test(bio)) {

        res.status(400).json({message: "Certains caractères contenu dans votre biographie ne sont pas acceptables"})

    } else {
      
        next()
    }
    
}