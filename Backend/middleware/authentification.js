//importation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
  try {
    // recupération du token dans le header authorization
    const token = req.headers.authorization.split(" ")[1];

    // décoder le token
    const decodedToken = jwt.verify(token, `$({process.env.JWT_KEY_TOKEN}`);

    //récupérer le userId qu'il y a à l'interieur du token déchiffré et le comparé avec l'user en clair
    const userIdDecodedToken = decodedToken.userId;
    // affichage de l'Id
    userIdParamsUrl = req.originalUrl.split("=")[1];

    //comparaison d'userId qu'il y a en clair dans le req avec le userId qu'il y a dans le token
    if (req._body === true) {
      // controle quand ça passe par BODY RAW
      if (req.body.userId == userIdDecodedToken) {
        next();
      } else {
        throw "erreur identifiaction userId";
      }
      //controle quand ça passe par le form-data( multer IMAGE) params url
    } else if (userIdParamsUrl == userIdDecodedToken) {
      next();
    } else {
      throw "erreur identification url params form-data";
    }

    // s'il y a des erreurs dans le try on les recupéres ici
  } catch (error) {
    res.status(401).json({
      message: "Echec Authentification",
      error: error,
    });
  }
};
