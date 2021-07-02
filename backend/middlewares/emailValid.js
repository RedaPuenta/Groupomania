//! Middleware qui permet de vérifier si un email est valide
module.exports = (req, res, next) => {

    const emailReq = req.body.email
    const regexEmail = new RegExp('^[a-zA-Z0-9._%+-]{2,}[@]{1}[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,3}$', 'g')

    if(emailReq.match(regexEmail)) {

        next()

    } else {

        res.status(400).json({message : "L'email ne semble pas valide"})
        
    }

}

