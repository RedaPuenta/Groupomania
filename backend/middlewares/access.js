require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    try {

        if (req.headers.authorization && req.body.userId) {

            const tokenClient = req.headers.authorization.split(" ")[1]
            const userIdClient = req.body.userId
            const decodedToken = jwt.verify(tokenClient, process.env.JWT_SECRET)
            const userIdDecoded = decodedToken.userId

            if (userIdClient !== userIdDecoded){

                res.status(498).json({message: "Le token a expiré"})
            
            } else {

                res.status(200).json({message: "L'accès est autorisé"})

            }

        } else {

            res.status(401).json({message: "L'accès n'est pas autorisé"})

        }


    } catch {

        res.status(498).json({message: "Le token est invalide"})

    }

}