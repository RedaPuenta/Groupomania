module.exports = (req, res, next) => {

    const passwordReq = req.body.password

    if (!/[A-Z]/.test(passwordReq)) {

        res.status(400).json({message : "Le mot de passe doit contenir au moins 1 majuscule"})
    
    } else if (!/[a-z]/.test(passwordReq)) {

        res.status(400).json({message : "Le mot de passe doit contenir au moins 1 minuscule"})
    
    } else if (!/[0-9]/.test(passwordReq)) {

        res.status(400).json({message : "Le mot de passe doit contenir au moins 1 chiffre"})

    } else if (!/[@$!%*?&.']/.test(passwordReq)) {
        
        res.status(400).json({message : "Le mot de passe doit contenir au moins 1 caractère spéciale (@$!%*?&.')"})
    
    } else if(passwordReq.length < 8) {

        res.status(400).json({message : "Le mot de passe doit contenir au moins 8 caractères"})

    }  else {

        next()

    }

}