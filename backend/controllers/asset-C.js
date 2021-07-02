const db = require("../mysql/connectDB")

//! Fonction qui permet de récupérer les avatars du sites (ALL)
exports.avatar = (req, res, next) => {

    //* On récupère dans la base de donnée tout les avatars du site
    db.query(`
        SELECT * FROM list_avatar
        ORDER BY avatar ASC`,
        function(error, results, fields) {

            //: Gestion des erreurs
            if(error == null) {

                //* On créer une variable qui va accueillir un résultat final (boucle ci dessous)
                let new_results = []

                //* Pour chaque avatar ...
                for (let i = 0; i < results.length; i++) {
                    
                    //* On construit son url 
                    results[i].avatar = `${req.protocol}://${req.get('host')}/media/avatar/${results[i].avatar}`

                    //* On on stock l'url dans le résultat final
                    new_results.push(results[i].avatar)
                    
                }

                //* Et on répond par une réponse de succès en envoyant le résultat final
                res.status(200).json(new_results)
                
            //: Gestion des erreurs
            } else {
                res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
            }
        }
    )

}