const regex = require("../regex/regex")
const fs = require("fs")

//! Middleware qui permet de vérifier si une publication (Multimédia) est valide
module.exports = (req, res, next) => {

    //* On transforme les doubles guillemets par des guillemets simples (si il y en a)
    req.body.legend = regex.revokeQuote(req.body.legend)
    
    //* On récupère la légende contenu dans le corps de la requête
    const field = req.body.legend
    
    //* On déclare le regex "ANTI-INJECTION"
    const regexAntiInjection = regex.antiInjection()

    //* On déclare les mimetypes valides
    const typeValid = ["image/jpeg", "image/jpg", "image/png", "image/gif", "video/mp4"]

    //* On créer une fonction pour supprimer le fichier précédemment télécharger (si il y en a un)
    function deleteImage() {
        if(req.file) {
            fs.unlink(`media/${req.file.filename}`, (err) => {
                if (err) throw err
            })
        }
    }

    //* On configure un tableau contenant tout les conditions à vérifier et leur réponse
    const cas = [
        {condition: field == "" || !/[a-zA-Z]/.test(field), réponse: `Vous avez oublié de renseigner une légende`, deleteFile: true},
        {condition: regexAntiInjection.test(field), réponse: `Certains caractères contenu dans votre légende ne sont pas acceptables`, deleteFile: true},
        {condition: field.length > 100, réponse: `Votre légende est trop longue (max 100 caractères)`, deleteFile: true},
        {condition: !req.file, réponse: `Votre publication ne contient pas de fichier`, deleteFile: false},
        {condition: req.file && typeValid.indexOf(req.file.mimetype) == -1, réponse: "Le format du fichier n'est pas autorisé", deleteFile: true},
        {condition: req.file && typeValid.indexOf(req.file.mimetype) < 4 && req.file.size/1024/1024 > 10, réponse: "Le fichier est trop lourd (max 10MB pour jpg, png, gif)", deleteFile: true},
        {condition: req.file && typeValid.indexOf(req.file.mimetype) == 4 && req.file.size/1024/1024 > 50, réponse: "Le fichier est trop lourd (max 50MB pour mp4)", deleteFile: true},
    ]

    //* On configure un système de point
    const valid = cas.length
    var points = 0

    //* Pour chaque conditions ...
    for (let i = 0; i < cas.length; i++) {
        
        //* Si la condition n'est pas respecter ...
        if(cas[i].condition){

            //* On supprime le fichier précédemment télécharger quand il le faut (si il y en a un)
            if(cas[i].deleteFile == true){
                deleteImage()
            }

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