const fs = require("fs")

module.exports = (req, res, next) => {

    const legend = req.body.legend
    const regexAntiInjection = /[<=>)(}{:;#_|+^*~$"]/
    
    function deleteImage() {
        if(req.file) {
            fs.unlink(`media/${req.file.filename}`, (err) => {
                if (err) throw err
            })
        }  
    }
    
    if(legend == ""){

        res.status(400).json({message: "Vous avez oublié de renseigner une légende"})

    } else if (regexAntiInjection.test(legend)) {

        deleteImage()

        res.status(400).json({message: "Certains caractères contenu dans la légende ne sont pas acceptables"})
    
    } else if (!req.file) {

        res.status(400).json({message: "Votre publication ne contient de pas fichier"})

    } else {
      
        next()
    }
    
}