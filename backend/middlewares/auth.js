require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    
    try {
        
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userIdDecoded = decodedToken.userId

        if (req.body.userId && req.body.userId !== userIdDecoded) {

           res.status(498).json({message: "Le token est expiré ou invalide"})
        
        } else {

            next()
        }

    } catch {

        res.status(498).json({message: "Le token est invalide"})
        
    }
    
}