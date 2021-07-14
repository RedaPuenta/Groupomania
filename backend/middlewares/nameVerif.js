//! Middleware qui permet de vérifier si un nom ou un prénom est valide
module.exports = (req, res, next) => {

    //* On récupère le nom et le prénom dans le corps de la requête
    const nom = req.body.nom
    const prenom = req.body.prenom

    //* On configure un tableau contenant tout les champs à vérifier et leur nom d'origine
    const toVerif = [
        {field: nom, name: 'nom'},
        {field: prenom, name: 'prénom'}
    ]

    //* On configure un sytème de point
    const valid = toVerif.length
    var points = 0

    //* On déclare le regex qui vérifie si un nom est correct
    const regexName = new RegExp('^[a-zA-Z]{2,}$')

    //* Pour chaque champs ...
    for (let i = 0; i < toVerif.length; i++) {

        //* Si le champ est vide ...
        if(toVerif[i].field == ""){

            //* On envoie une réponse d'échec (PERSONNALISEE)
            res.status(400).json({message: `Vous avez oublié de renseigner votre ${toVerif[i].name}`})
            break
        
        //* Sinon, si le champ n'est pas en concordance avec le regex ...
        } else if (regexName.test(toVerif[i].field) == false){

            //* On envoie une réponse d'échec (PERSONNALISEE)
            res.status(400).json({message: `Le ${toVerif[i].name} que vous avez renseigné ne semble pas correct`})
            break
        
        //* Sinon, si tout est correct, on ajoute 1 point
        } else {
            points++
        }
        
    }

    //* Si les points correpondent à la taille du tableau des champs à vérifier ...
    if(valid == points){

        //* On passe à la suite
        next()

    }

}