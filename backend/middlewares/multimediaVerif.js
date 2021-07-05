const fs = require("fs")

//! Middleware qui permet de vérifier si une légende de post est valide
module.exports = (req, res, next) => {
    
    const field = req.body.legend
    const regexAntiInjection = /[<>}{;_|^*~$]/
    
    function deleteImage() {
        if(req.file) {
            fs.unlink(`media/${req.file.filename}`, (err) => {
                if (err) throw err
            })
        }  
    }
    
    if(field == ""  || !/[a-z]/.test(field)){
        
        res.status(400).json({message: "Vous avez oublié de renseigner une légende"})

    } else if (regexAntiInjection.test(field)) {
        
        deleteImage()

        res.status(400).json({message: "Certains caractères contenu dans votre légende ne sont pas acceptables"})
    
    } else if (!req.file) {
        
        res.status(400).json({message: "Votre publication ne contient de pas fichier"})
        
    } else {
 
        next()
    }
    
}