const db = require("../mysql/connectDB")
const dbRequest = require("../mysql/dbRequest")
const fs = require("fs")
const datefns = require("date-fns")
const { fr } = require("date-fns/locale")

//! Fonction qui permet de récupérer toutes les informations relatives à la page "info" (USER + ADMIN)
exports.info = (req, res) => {
    
    //* On récupère le "userId" de l'utilisateur qui demande des informations
    const userId = req.params.userIdVerif

    //* On cherche dans la base donnée le privilège de cette utilisateur
    db.query(dbRequest.privilegeUser(userId), function(error, results){

        //: Gestion des erreurs
        if(error == null){

            //* On stock le privilège de l'utilisateur
            const privilege = results[0].privilege

            //* On récupère dans la base de donnée des informations sur l'utilisateur
            //-SELECT --> firstName, lastName, bio, avatar, userId
            db.query(dbRequest.recoverForInfo(userId), function(error, results) {

                //: Gestion des erreurs
                if(error == null) {
                    
                    //* On contruit l'avatar de l'utilisateurs
                    results[0].avatar = `${req.protocol}://${req.get('host')}/media/avatar/${results[0].avatar}`

                    //* Et on envoie une réponse de succès
                    res.status(200).json({info: results, privilege: privilege})

                //: Gestion des erreurs
                } else {

                    res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})

                }
            })

        //: Gestion des erreurs
        } else{
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })

}

//! Fonction qui permet de récupérer toutes les informations relatives à la page "friends" (ALL)
exports.friends = (req, res)  => {

    //* On récupère le "userId" de l'utilisateur qui demande les informations
    const userId = req.params.userId
    
    //* On récupère dans la base de données des informations sur tout les autres utilisateurs (sauf celui qui demande)
    //-SELECT --> firstName, lastName, bio, avatar, userId, privilege + nombre de contenu "agora" et "multimedia"
    db.query(dbRequest.recoverForFriends(userId), function(error, results){
        
        //: Gestion des erreurs
        if(error == null) {

            //* Si le résultat n'est pas vide ...
            if(results.length !== 0){

                //* On contruit l'avatar des utilisateurs
                results.forEach(element => {
                    element.avatar = `${req.protocol}://${req.get('host')}/media/avatar/${element.avatar}`
                });
                
                //* Et on envoie une réponse de succès
                res.status(200).json(results)
            
            //* Sinon, si le résultat est vide ...
            } else {

                //* On envoie une réponse d'échec
                res.status(404).json({message: "Vous n'avez pas de camarade car vous êtes le seul inscrit"})
            }

        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
    })
    
}

//! Fonction qui permet de récupérer toutes les informations relatives à la page "Profil" (ALL)
exports.profil = (req, res)  => {
    
    //* On récupère le "userId" de l'utilisateur ciblé
    const userId = req.params.userId
    
    //* On récupère dans la base de données des informations sur l'utilisateur ciblées
    //* Avatar, prénom, nom, bio + nombre de contenu "agora" et "multimedia" + nombre de "like" et de "commentaire" 
    db.query(dbRequest.recoverForProfil(userId), function(error, results){

        //: Gestion des erreurs
        if(error == null) {

            //* On créer le score de "réaction" et de "participation" de l'utilisateur selon un algorithme
            const pts_likes = 14
            const pts_comments = 11
            const pts_multimedia = 17
            const pts_forum = 21
            let score_reaction = (parseInt(results[0].likes) * pts_likes) + (parseInt(results[0].comments) * pts_comments)
            let score_participation = (parseInt(results[0].multimedia) * pts_multimedia) + (parseInt(results[0].forum) * pts_forum)

            //* On tranforme la date associé au profil
            results[0].dateCreation = datefns.formatDistanceStrict(Date.now(), results[0].dateCreation, {addSuffix: false, locale: fr})

            //* On contruit l'avatar de l'utilisateur
            results[0].avatar = `${req.protocol}://${req.get('host')}/media/avatar/${results[0].avatar}`
        
            //* On envoie une réponse de succès
            //-SELECT --> firstName, lastName, bio, avatar, userId, dateCreation, privilege + nombre de contenu "agora" et "multimedia" + nombre de "like" et de "commentaire" 
            res.status(200).json(
                [
                    {
                        score_reaction: score_reaction, 
                        score_participation: score_participation,
                        avatar: results[0].avatar,
                        firstName: results[0].firstName,
                        lastName: results[0].lastName,
                        multimedia: results[0].multimedia,
                        forum: results[0].forum,
                        bio: results[0].bio,
                        dateCreation: results[0].dateCreation
                    }
                ]
            )
        
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }
    })
    
}

//! Fonction qui permet de modifier les informations d'un utilisateur (USER + ADMIN)
exports.updateUser = (req, res) => {

    //* On récupère toutes les nouvelles informations
    const avatar = req.body.avatar.split("/avatar/")[1]
    const bio = req.body.bio
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userId = req.params.userIdVerif
    
    //* On remplace les anciennes informations par les nouvelles + témoin de première connexion (true)
    db.query(dbRequest.updateUser(avatar, bio, firstName, lastName, 1, userId), function(error) {
            
        //: Gestion des erreurs
        if(error == null) {
            res.status(201).json({message: "Vos informations on été modifiées"})
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })
}

//! Fonction qui permet de supprimé un utilisateur (USER + ADMIN)
exports.deleteUser = (req, res) => {

    //* On récupère le "userId" de l'utlisateur qui doit être supprimée 
    const userId = req.params.userIdVerif

    //* On récupère dans la base de donnée tout les fichiers (url) associés à l'utilisateur
    db.query(dbRequest.selectCurrentFileUser(userId), function(error, results){

        //: Gestion des erreurs
        if(error == null){
            
            //* On stock les fichiers (url) associés à l'utilisateur
            const mediaUrl = results
            
            //* On supprime l'utilisateur dans la base de donnée
            db.query(dbRequest.deleteUser(userId), function(error) {
                    
                //: Gestion des erreurs
                if(error == null) {

                    //* On supprime tout les fichiers associés à l'utilisateurs dans le serveur
                    for (let i = 0; i < mediaUrl.length; i++) {
                        
                        fs.unlink(`media/${mediaUrl[i].media}`, (err) => {
                            if (err) throw err
                        })
                        
                    }

                    res.status(200).json({message: "Votre compte à été supprimée"})
                
                //: Gestion des erreurs
                } else {
                    res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
                }

            })
        
        //: Gestion des erreurs
        } else {
            res.status(500).json({message: "Erreur interne du serveur, veuillez réessayer plus tard"})
        }

    })

}