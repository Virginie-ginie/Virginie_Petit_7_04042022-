// multer pour gérer les requêtes HTTP avec envoi de fichier
//importation de multer
const multer = require("multer");

//le dictionnaire des MIME TYPES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
};

// la destination du fichier et générr un nom de fichier unique
const storage = multer.diskStorage({
  //la destination de stackage
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //supprimer les esapces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extention = MIME_TYPES[file.mimetype];

    //callback(null, name + "_" + Date.now()+ "." + extention);
    callback(null, `${name}_${Date.now()}.${extention}`);
  },
});

//exportation du middleware multer
module.exports = multer({storage: storage}).single("attachment");
