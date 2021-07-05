const multer = require("multer")

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "video/mp4": "mp4"
}

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, "media")
    },

    filename: (req, file, callback) => {
        
        const name = file.originalname.split(" ").join("_")
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + "." + extension)
    }
})

//! Middleware qui permet de télécharger des fichiers
module.exports = multer({ storage }).single("file")