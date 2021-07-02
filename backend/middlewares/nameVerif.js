//! Middleware qui permet de vérifier si un nom ou un prénom est valide
module.exports = (req, res, next) => {

    const nom = req.body.nom
    const prenom = req.body.prenom

    const regexName = new RegExp('^[a-zA-Z]{2,}$')

    if(nom == "") {

        res.status(400).json({message: "Vous avez oublié de renseigner votre nom"})

    } else if (regexName.test(nom) == false) {

        res.status(400).json({message: "Le nom que vous avez renseigné ne semble pas correct"})

    } else if (prenom == "") {

        res.status(400).json({message: "Vous avez oublié de renseigner votre prénom"})

    } else if (regexName.test(prenom) == false) {
 
        res.status(400).json({message: "Le prénom que vous avez renseigner ne semble pas correct"})

    } else {

        next()

    }
}