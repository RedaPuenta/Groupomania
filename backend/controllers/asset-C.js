const db = require("../mysql/connectDB")

exports.avatar = (req, res, next) => {

    db.query(`
        SELECT * FROM list_avatar
        ORDER BY avatar ASC`,
        function(error, results, fields) {

            if(error == null) {

                res.status(200).json(results)

            } else {
                
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

            }
        }
    )

}