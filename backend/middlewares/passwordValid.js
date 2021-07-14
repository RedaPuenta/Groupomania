//! Middleware qui permet de vérifier si un mot de passe est fort
module.exports = (req, res, next) => {

    //* On récupère le mot de passe dans le corps de la reuqête
    const passwordReq = req.body.password

    //* On configure un tableau contenant tout les conditions à vérifier et leur réponse
    const cas = [
        {condition: /[\s]/.test(passwordReq), réponse: "Le mot de passe contient des caractères blancs"},
        {condition: !/[A-Z]/.test(passwordReq), réponse: "Le mot de passe doit contenir au moins 1 majuscule"},
        {condition: !/[a-z]/.test(passwordReq), réponse: "Le mot de passe doit contenir au moins 1 minuscule"},
        {condition: !/[0-9]/.test(passwordReq), réponse: "Le mot de passe doit contenir au moins 1 chiffre"},
        {condition: !/[@$!%*?&.']/.test(passwordReq), réponse: "Le mot de passe doit contenir au moins 1 caractère spéciale (@$!%*?&.')"},
        {condition: passwordReq.length < 8, réponse: "Le mot de passe doit contenir au moins 8 caractères"}
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