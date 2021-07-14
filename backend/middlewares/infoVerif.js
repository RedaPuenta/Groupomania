//! Middleware qui vérifie si la bio, le nom et le prénom sont correctes
module.exports = (req, res, next) => {

    //* On récupère le prénom, le nom et la bio de l'utilisateur dans le corps de la requête
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const bio = req.body.bio

    //* On déclare le regex "ANTI-INJECTION"
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    //* On configure un tableau contenant tout les champs à vérifier et leur nom d'origine
    const toVerif = [
        {field: firstName, name: 'prénom'},
        {field: lastName, name: 'nom'},
        {field: bio, name: 'biographie'}
    ]

    //* On configure un système de point
    const valid = toVerif.length
    var points = 0
    
    //* Pour chaque champs ...
    for (let i = 0; i < toVerif.length; i++) {

        //* Si le champ est vide et qu'il ne contient pas de lettre ...
        if(toVerif[i].field == "" || !/[a-zA-Z]/.test(toVerif[i])){

            //* On envoie une réponse d'échec (PERSONNALISEE)
            res.status(400).json({message: `Vous avez oublié de renseigner votre ${toVerif[i].name}`})
            break
        
        //* Sinon, si le champ n'est pas en concordance avec le regex ...
        } else if (regexAntiInjection.test(toVerif[i].field)){

            //* On envoie une réponse d'échec (PERSONNALISEE)
            res.status(400).json({message: `Certains caractères contenu dans votre ${toVerif[i].name} ne sont pas acceptables`})
            break
        
        //* Sinon, si la biographie contient plus de 150 caractères ...
        } else if (toVerif[i].field == bio && bio.length > 150) {

            //* On envoie une réponse d'échec (PERSONNALISEE)
            res.status(400).json({message: `Votre ${toVerif[i].name} est trop longue (max 150 caractères)`})
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